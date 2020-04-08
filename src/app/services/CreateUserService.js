import database from '../../database';
import School from '../models/School';
import User from '../models/User';
import Role from '../models/Role';

import Queue from '../../lib/Queue';

import RegistrationEmail from '../jobs/RegistrationEmail';
import UserCreationEmail from '../jobs/UserCreationEmail';

class CreateUserService {
	async run({ user, school, role }) {
		const transaction = await database.connection.transaction();

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

			({ id: schoolId } = await School.create(school, { transaction }));
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
		// Creates a new user, if the password doesn't exist,
		//	it's given an randon one
		const createdUser = await User.create(
			{
				...user,
				password: user.password || randomPass,
				roleId,
				schoolId,
			},
			{ transaction }
		);

		const { passwordHash, password, ...restUser } = createdUser.toJSON();

		// Send email to the user
		Queue.add(UserCreationEmail.key, {
			newUser: {
				name: createdUser.name,
				email: createdUser.email,
				password: password,
			},
			receiver: { email: createdUser.email },
		});

		if (role) {

			transaction.commit();
			return restUser;
		}

		let receiverEmailList = process.env.ADMIN_EMAIL;

		// If the user isn't a coordinator, it is a professor.
		if (!user.coordinator) {
			const coordinator = await User.findAll({
				attributes: ['email'],
				where: { schoolId, roleId: 2, active: true }, // 2 Coordinator because of id in the db
			});

			if (coordinator) {
				receiverEmailList = coordinator.map(({ email }) => email);
			}
			// if it is a coordiantor, will send email to the platform admin
		} else {
			const admin = await User.findAll({
				attributes: ['email'],
				where: { roleId: 1 }, // 1 Admin
			});

			if (admin) {
				receiverEmailList = admin.map(({ email }) => email);
			}
		}

		// Send email to coordinators or admins
		receiverEmailList.forEach(email =>
			Queue.add(RegistrationEmail.key, {
				newUser: { name: createdUser.name, email: createdUser.email },
				receiver: { email: email },
			})
		);
		await transaction.commit();
		return restUser;
	}
}

export default new CreateUserService();
