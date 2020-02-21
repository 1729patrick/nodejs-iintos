import CreateUserService from '../services/CreateUserService';
import User from '../models/User';
import Role from '../models/Role';
import School from '../models/School';
import File from '../models/File';

// Controller of all users, includes the cruds
class UserController {
	// Get, Returns all the users in database
	async index(req, res) {
		const { role } = req.query;

		let findedRole = {},
			where = {};

		if (role) {
			findedRole = await Role.findOne({ where: { name: role } });

			if (findedRole) where = { where: { roleId: findedRole.id } };
		}

		const users = await User.findAll({
			...where,
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
					attributes: ['name'],
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
		console.log(req.query);

		//Find from the route id and deletes the object
		await User.destroy({ where: { id: req.params.id } });

		return res.json();
	}

	// Updates a user
	async update(req, res) {
		const { id } = req.params;
		const user = req.body;

		//Find from the route id and updates the object
		const createdUser = await User.update(user, {
			where: { id },
			returning: true,
			plain: true,
			raw: true,
		});

		const school = await School.findByPk(user.schoolId);

		if (school && school.active !== user.active) {
			await school.update({ ...school, active: user.active });
		}

		const { passwordHash, ...restUser } = createdUser[1];
		//1 because of an null
		return res.json(restUser);
	}
}

export default new UserController();
