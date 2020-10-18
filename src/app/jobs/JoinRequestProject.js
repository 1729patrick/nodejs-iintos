import Mail from '../../lib/Mail';
import SchoolProject from '../models/SchoolProject';
import User from '../models/User';

import Notification from '../schemas/Notification';

/**
 * Email sent when a new project is created
 */
class JoinRequestProject {
	get key() {
		return 'JoinRequestProject';
	}

	async handle({ data }) {
		// Recives a new activity to send some of it's details
		const { message, projectId } = data;

		const url = `projects/details/${projectId}/requests`;

		const schoolProject = await SchoolProject.findAll({
			where: { projectId, active: true },
			include: [
				{
					model: User,
					as: 'coordinator',
				},
			],
			attributes: ['coordinator.id', 'coordinator.email'],
			group: ['coordinator.id', 'coordinator.email'],
		});

		schoolProject.map(async ({ coordinator }) => {
			await Notification.create({
				userId: coordinator.id,
				message,
				url,
			});

			await Mail.sendMail({
				to: `${coordinator.email}`,
				from: '"IINTOS" <foo@iintos.com>',
				subject: '[IINTOS] New Join Request',
				html: `
			<div style="
			width: 500px;
			background: #ddd;
			padding: 30px;
			border-radius: 6px;
			font-size: 15px;
			margin: 0 auto;
			">

			<p style="
			font-size: 27px;
			font-weight: 600;
			margin: 0 0 15px;
			">
			<b>${message}</b></p>
			
			
			 <a style="   
			 height: 50px;
			 border-radius: 4px;
			 border: none;
			 background: #0c1e3f;
			 color: #fff;
			 font-weight: 500;
			 font-size: 16px;
			 padding: 0 16px;
			 text-decoration: none;
			 width: 470px;
			 display: flex;
			 margin: 0 auto;
			 line-height: 50px;
			 text-align: center;
			 justify-content: center;
			 text-decoration: none;" href="${process.env.FRONT_URL}/${url}">Go to IIntos check it out!</a>
			 </div>
			 `,
			});
		});
	}
}

export default new JoinRequestProject();
