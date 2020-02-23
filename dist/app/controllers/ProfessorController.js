"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _ProjectUser = require('../models/ProjectUser'); var _ProjectUser2 = _interopRequireDefault(_ProjectUser);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Role = require('../models/Role'); var _Role2 = _interopRequireDefault(_Role);

class ProfessorController {
	async index(req, res) {
		const { projectId } = req.query;

		const projectUser = await _ProjectUser2.default.findAll({ where: { projectId } });

		const professorsAlreadyProject = projectUser.map(({ userId }) => userId);

		const role = await _Role2.default.findOne({ where: { name: 'Professor' } });
		const users = await _User2.default.findAll({
			where: { roleId: role.id, id: { [_sequelize.Op.notIn]: professorsAlreadyProject } },
		});

		return res.json(users);
	}
}

exports. default = new ProfessorController();
