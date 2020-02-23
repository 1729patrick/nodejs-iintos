import School from '../models/School';
import User from '../models/User';
import Role from '../models/Role';

import Queue from '../../lib/Queue';

import RegistrationEmail from '../jobs/RegistrationEmail';

class CreateUserService {
	async run({ user, school, role }) {
		const userExists = await User.findOne({ where: { email: user.email } });

		if (userExists) {
			throw new Error('User already exists');
		}

		let { schoolId, name } = school;

		if (!schoolId && name) {
			const schoolExists = await School.findOne({
				where: { name },
			});

			if (schoolExists) {
				throw new Error('School already exists');
			}

			({ id: schoolId } = await School.create(school));
		}

		let { roleId } = user;
		if (!roleId) {
			const findedRole = await Role.findOne({
				where: { name: user.coordinator ? 'Coordinator' : 'Professor' },
				attributes: ['id'],
			});

			roleId = findedRole.id;
		}

		const randomPass = (Math.random(1729) * 1000000).toFixed(0);

		const createdUser = await User.create({
			...user,
			password: user.password || randomPass,
			roleId,
			schoolId,
		});

		const { passwordHash, password, ...restUser } = createdUser.toJSON();

		Queue.add(RegistrationEmail.key, {
			newUser: { name: 'patrick', email: '1729patrick@gmail.com' },
			receiver: { email: '1729patrick@gmail.com' },
		});

		if (role) {
			return restUser;
		}

		let receiverEmail = process.env.ADMIN_EMAIL;
		if (!user.coordinator) {
			const coordinator = await User.findOne({
				attributes: ['email'],
				where: { schoolId, roleId: 1, active: true },
			});

			if (coordinator) {
				receiverEmail = coordinator.email;
			}
		}

		console.log(RegistrationEmail.key);
		Queue.add(RegistrationEmail.key, {
			newUser: { name: createdUser.name, email: createdUser.email },
			receiver: { email: receiverEmail },
		});

		return restUser;
	}
}

export default new CreateUserService();
