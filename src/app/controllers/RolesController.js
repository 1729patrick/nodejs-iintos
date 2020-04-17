import { Op } from 'sequelize';
import Role from '../models/Role';
class RolesController {
	async index(req, res) {
		let where = {};
		if (req.role === 'Coordinator') {
			where = { where: { name: { [Op.in]: ['Coordinator', 'Professor'] } } };
		}

		if (req.role === 'IINTOS-Admin' || req.role === 'IINTOS-Partner') {
			where = {
				where: { name: { [Op.in]: ['IINTOS-Admin', 'IINTOS-Partner'] } },
			};
		}

		let roles = await Role.findAll(where);

		roles.forEach((role) => {
			if (role.name === 'Professor') {
				role.name = 'Teacher';
			}
		});

		return res.json(roles);
	}
}

export default new RolesController();
