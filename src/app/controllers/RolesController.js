import Role from '../models/Role';
class RolesController {
	async index(req, res) {
		const roles = await Role.findAll();

		return res.json(roles);
	}
}

export default new RolesController();
