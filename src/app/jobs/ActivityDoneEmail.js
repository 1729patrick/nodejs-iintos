import Mail from '../../lib/Mail';

/**
 * Email sent when a new project is created
 */
class ActivityDoneEmail {
	get key() {
		return 'ActivityDoneEmail';
	}

	async handle({ data }) {
		// Recives a new activity to send some of it's details
		const { newActivity, receiver } = data;

		await Mail.sendMail({
			to: `${receiver.email}`,
			from: '"IINTOS" <foo@iintos.com>',
			subject: '[IINTOS] New Activity Created',
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
			<b>Activity Done!</b></p>
			<p>This activity is done!!! Go check it out.</p>
			<p><span style="font-weight: 600">Title:</span> ${newActivity.title}</p>
			<p><span style="font-weight: 600">Description:</span> ${newActivity.description}</p>

			
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
			 ustify-content: center;
			 text-decoration: none;" href="https://iintos.netlify.com/projects/details/${newActivity.projectId}/activities">Go to IIntos check it out!</a>
			 </div>
			 `,
		});
	}
}

export default new ActivityDoneEmail();
