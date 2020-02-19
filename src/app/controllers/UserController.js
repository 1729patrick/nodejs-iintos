import CreateUserService from '../services/CreateUserService';

class UserController {

	async create(req, res) {
		const { user, school } = req.body;

		const userCreated = await CreateUserService.run({ user, school });

		return res.json(userCreated);
	}
}

export default new UserController();
