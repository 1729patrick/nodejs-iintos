"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _ProjectUser = require('../models/ProjectUser'); var _ProjectUser2 = _interopRequireDefault(_ProjectUser);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

/**
 *	Controller for the binding of an user and an project
 */
class ProjectUserController {
	/**
	 * Gets all the user in this project
	 * @param {} req
	 * @param {*} res
	 */
	async index(req, res) {
		const projectId = req.params.id;
		const projectUser = await _ProjectUser2.default.findAll({
			where: { projectId },
			include: [
				{
					model: _User2.default,
					as: 'professor',
					attributes: { exclude: 'passwordHash' },
				},
			],
		});

		let students = [],
			professors = [];
		projectUser.forEach(user => {
			if (user.professor) {
				return professors.push(user);
			}

			return students.push(user);
		});

		res.json({ students, professors });
	}

	async create(req, res) {
		const projectUser = await _ProjectUser2.default.create(req.body);

		res.json(projectUser);
	}

	async delete(req, res) {
		const { id } = req.params;
		const projectUser = await _ProjectUser2.default.destroy({ where: { id } });

		res.json(projectUser);
	}
}
exports. default = new ProjectUserController();
