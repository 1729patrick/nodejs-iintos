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

		let findedRole = {},
			where = { id: { [Op.ne]: req.userId } };

		if (role) {
			findedRole = await Role.findOne({ where: { name: role } });

			if (findedRole) where = { ...where, roleId: findedRole.id };
		}

		if (req.role === 'Coordinator' || req.role === 'Professor') {
			where = { ...where, schoolId: req.schoolId };
		}

		if (req.role === 'IINTOS-Admin' || req.role === 'IINTOS-Partner') {
			where = { ...where, roleId: { [Op.or]: [4, 5] } };
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
		//Find from the route id and deletes the object
		await User.destroy({ where: { id: req.params.id } });

		return res.json();
	}

	// Updates a user
	async update(req, res) {
		const { id } = req.params;
		const user = req.body;

		const ogUser = await User.findOne({ where: { id: req.params.id } });

		//Find from the route id and updates the object
		const updatedUser = await User.update(user, {
			where: { id },
			returning: true,
			plain: true,
			raw: true,
		});

		console.log('params');
		console.log(updatedUser);

		// if it's active send a email for the activation
		if (ogUser.active !== updatedUser[1].active) {
			Queue.add(ActivationEmail.key, {
				newUser: {
					name: updatedUser[1].name,
					email: updatedUser[1].email,
					active: updatedUser[1].active,
					reasonInactive: user.reasonInactive,
				},
				receiver: { email: updatedUser[1].email },
			});
		}

		const school = await School.findByPk(user.schoolId);

		if (school && school.active !== user.active) {
			await school.update({ ...school, active: user.active });
		}

		const { passwordHash, ...restUser } = updatedUser[1];
		//1 because of an null
		return res.json(restUser);
	}
}

export default new UserController();
