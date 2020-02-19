import School from '../models/School';
import User from '../models/User';
import Role from '../models/Role';

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

		const role = await Role.findOne({
			where: { name: user.coordinator ? 'Coordinator' : 'Professor' },
			attributes: ['id'],
		});

		const roleId = role.id;
		const createdUser = await User.create({
			...user,
			roleId,
			schoolId,
		});

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

		Queue.add(RegistrationEmail.key, {
			newUser: { name: createdUser.name, email: createdUser.email },
			receiver: { email: receiverEmail },
		});

		const { passwordHash, ...restUser } = createdUser.toJSON();
		return restUser;
	}
}

export default new CreateUserService();
