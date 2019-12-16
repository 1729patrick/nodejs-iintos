import School from '../models/School';
import User from '../models/User';

import Queue from '../../lib/Queue';

import RegistrationEmail from '../jobs/RegistrationEmail';

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

		let receiverEmail = process.env.ADMIN_EMAIL;
		if (!cordinator) {
			const cordinator = await User.findOne({
				attributes: ['email'],
				where: { schoolId, cordinator: true, active: true },
			});

			receiverEmail = cordinator.email;
		}

		Queue.add(RegistrationEmail.key, {
			newUser: { name, email },
			receiver: { email: receiverEmail },
		});

		return { name, email, cordinator, cordinatorVerification };
	}
}

export default new CreateUserService();
