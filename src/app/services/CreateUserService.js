import School from '../models/School';
import User from '../models/User';

import mail from '../../lib/mail';

class CreateUserService {
	async run({ user, school }) {
		const userExists = await User.findOne({ where: { email: user.email } });
		if (userExists) {
			throw new Error('User already exists');
		}

		let { schoolId } = school;
		if (!school.schoolId) {
			const schoolExists = await School.findOne({
				where: { name: school.name },
			});

			if (schoolExists) {
				throw new Error('School already exists');
			}

			({ id: schoolId } = await School.create(school));
		}

		const {
			name,
			email,
			cordinator,
			cordinatorVerification,
		} = await User.create({
			...user,
			schoolId,
		});

		await mail.sendMail({
			from: '"IINTOS" <foo@iintos.com>',
			to: 'patrick.pb845@gmail.com',
			subject: 'New Registered Cordinator',
			html: `
			<p><b><u>CORDENATOR DETAILS<u></b></p>
			<p><b>NAME:</b> ${name}</p>
			<p><b>EMAIL:</b> ${email}</p>
						
			 <a href="http://localhost:3000/confirm_cordinator">SHOW MORE DETAILS</a>`,
		});

		return { name, email, cordinator, cordinatorVerification };
	}
}

export default new CreateUserService();
