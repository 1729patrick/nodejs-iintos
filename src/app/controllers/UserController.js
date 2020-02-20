import CreateUserService from '../services/CreateUserService';
import User from '../models/User';
import Role from '../models/Role';
import School from '../models/School';

// Controller of all users, includes the cruds
class UserController {
	// Get, Returns all the users in database
	async index(_, res) {
		const users = await User.findAll({
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
			],
			raw: true,
			nest: true,
		});

		return res.json(
			users.map(user => ({
				...user,
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
		console.log(req.body);

		//Find from the route id and updates the object
		const user = await User.update(req.body, {
			where: { id: req.params.id },
			returning: true,
			plain: true,
		});

		//1 because of an null
		return res.json(user[1]);
	}
}

export default new UserController();
