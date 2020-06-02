import { Op } from 'sequelize';
import CreateUserService from '../services/CreateUserService';
import User from '../models/User';
import Role from '../models/Role';
import School from '../models/School';
import File from '../models/File';
import Queue from '../../lib/Queue';
import ActivationEmail from '../jobs/ActivationEmail';

// Controller of all users, includes the cruds
class UserController {
	// Get, Returns all the users in database
	async index(req, res) {
		const { role } = req.query;

		let findedRole = {};
		let where = {
			id: {
				[Op.ne]: req.userId,
			},
		};

		if (role) {
			findedRole = await Role.findOne({
				where: {
					name: role,
				},
			});

			if (findedRole)
				where = {
					...where,
					roleId: findedRole.id,
				};
		}

		if (req.role === 'Coordinator' || req.role === 'Professor') {
			where = {
				...where,
				schoolId: req.schoolId,
			};
		}

		if (req.role === 'IINTOS-Admin' || req.role === 'IINTOS-Partner') {
			where = {
				...where,
				roleId: {
					[Op.or]: [4, 5],
				},
			};
		}

		const users = await User.findAll({
			where,
			attributes: {
				exclude: ['passwordHash'],
			},
			include: [
				{
					model: Role,
					as: 'role',
					attributes: ['name'],
				},
				{
					model: School,
					as: 'school',
					attributes: ['id', 'name'],
				},
				{
					model: File,
					as: 'certificate',
				},
			],
			raw: true,
			nest: true,
		});

		users.forEach(user => {
			if (user.role.name === 'Professor') {
				user.role.name = 'Teacher';
			}
		});
		return res.json(
			users.map(user => ({
				...user,
				certificate: user.certificate.path
					? `${process.env.APP_URL}/files/${user.certificate.path}`
					: null,
				role: user.role.name,
				school: user.school ? user.school.name : null,
			}))
		);
	}

	// Post, creates a single user
	async create(req, res) {
		const { user, school } = req.body;

		const userCreated = await CreateUserService.run({
			user,
			school,
			role: req.role,
		});

		return res.json(userCreated);
	}

	// Delete a user
	async delete(req, res) {
		// Find from the route id and deletes the object
		await User.destroy({
			where: {
				id: req.params.id,
			},
		});

		return res.json();
	}

	// Updates a user
	async update(req, res) {
		let { password, oldPassword, ...user } = req.body;
		const id = oldPassword ? req.userId : req.params.id;

		const ogUser = await User.findOne({
			where: {
				id,
			},
		});

		if (oldPassword) {
			if (!(await ogUser.checkPassword(oldPassword))) {
				return res.status(401).json({
					error: "Password don't match",
				});
			}

			user = {
				...user,
				password,
			};
		}

		const ogActive = ogUser.active;

		// Find from the route id and updates the object
		ogUser.update(user);
		ogUser.save();

		// If the original is diferente form the updated or if both are false
		if (
			ogActive !== user.active ||
			(ogActive === false && user.active === false)
		) {
			Queue.add(ActivationEmail.key, {
				newUser: {
					name: user.name,
					email: user.email,
					active: user.active,
					reasonInactive: user.reasonInactive,
				},
				receiver: {
					email: user.email,
				},
			});
		}

		const school = await School.findByPk(user.schoolId);

		if (school && school.active !== user.active) {
			await school.update({
				...school,
				active: user.active,
			});
		}

		const { passwordHash, password: _, ...restUser } = user;
		// 1 because of an null
		return res.json(restUser);
	}
}

export default new UserController();
