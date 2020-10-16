import { Op } from 'sequelize';
import Role from '../models/Role';

/**
 * Controller for roles
 *
 * @class RolesController
 */
class RolesController {
	/**
	 * Return all the roles for users
	 *
	 * @param {*} req
	 * @param {*} res
	 *
	 * @memberof RolesController
	 */
	async index(req, res) {
		let where = {};
		if (req.role === 'Coordinator') {
			where = {
				where: { name: { [Op.in]: ['Coordinator', 'Professor'] } },
				order: [['createdAt', 'DESC']],
			};
		}

		if (req.role === 'IINTOS-Admin' || req.role === 'IINTOS-Partner') {
			where = {
				where: { name: { [Op.in]: ['IINTOS-Admin', 'IINTOS-Partner'] } },
				order: [['createdAt', 'DESC']],
			};
		}

		const roles = await Role.findAll(where);

		roles.forEach(role => {
			if (role.name === 'Professor') {
				role.name = 'Teacher';
			}
		});

		return res.json(roles);
	}
}

export default new RolesController();
