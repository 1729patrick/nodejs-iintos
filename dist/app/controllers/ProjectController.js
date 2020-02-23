"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Project = require('../models/Project'); var _Project2 = _interopRequireDefault(_Project);

// Project controller that returns the essencial information
class ProjectController {
	//Returns all the projects
	async index(req, res) {
		const projects = await _Project2.default.findAll();

		return res.json(projects);
	}

	// Create a new Project
	async create(req, res) {
		const project = await _Project2.default.create(req.body);

		return res.json(project);
	}

	async findOne(req, res) {
		const project = await _Project2.default.findOne({
			 where: { id: req.params.id },
			include: []
		});

		return res.json(project);
	}

	// Updates a Project
	async update(req, res) {
		const {
			global,
			description,
			links,
			targetAudience,
			type,
			title,
		} = req.body;

		const updatedProject = {
			global,
			description,
			links,
			targetAudience,
			type,
			title,
		};

		//Find from the route id and updates the object
		const project = await _Project2.default.update(updatedProject, {
			where: { id: req.params.id },
			returning: true,
			plain: true,
		});

		//1 because of an null
		return res.json(project[1]);
	}

	// Delete a  Project
	async delete(req, res) {
		//Find from the route id and deletes the object
		await _Project2.default.destroy({ where: { id: req.params.id } });

		return res.json();
	}
}

exports. default = new ProjectController();
