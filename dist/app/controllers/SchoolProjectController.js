"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _SchoolProject = require('../models/SchoolProject'); var _SchoolProject2 = _interopRequireDefault(_SchoolProject);
var _School = require('../models/School'); var _School2 = _interopRequireDefault(_School);

// Controler for the binding of a school anda project
class SchoolProjectController {
	//Creates a binding between a project and a school
	async create(req, res) {
		const { projectId, schoolId } = req.body;

		const schoolProject = await _SchoolProject2.default.create({ projectId, schoolId });

		return res.json(schoolProject);
	}

	//Get all the school from a projects :id
	async index(req, res) {
		const projectId = req.params.id;

		const project = await _SchoolProject2.default.findAll({
			where: { projectId },
			attributes: ['id', 'schoolId'],
			include: [
				{
					model: _School2.default,
					as: 'school',
					attributes: ['name', 'phone', 'country', 'city', 'postalCode'],
				},
			],
		});

		res.json(project);
	}

	// Deletes the bind between a school and a project
	async delete(req, res) {
		const id = req.params.id;

		await _SchoolProject2.default.destroy({ where: { id } });

		return res.json();
	}
}

exports. default = new SchoolProjectController();
