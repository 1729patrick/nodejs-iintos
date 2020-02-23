import { Op } from 'sequelize';
import Role from '../models/Role';
class RolesController {
	async index(req, res) {
		let where = {};
		if (req.role === 'Coordinator') {
			where = { where: { name: { [Op.in]: ['Coordinator', 'Professor'] } } };
		}

		const roles = await Role.findAll(where);

		return res.json(roles);
	}
}

export default new RolesController();
