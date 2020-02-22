import Project from '../models/Project';

// Project controller that returns the essencial information
class ProjectController {
	//Returns all the projects
	async index(req, res) {
		const projects = await Project.findAll();
		return res.json(projects);
	}

	// Create a new Project
	async create(req, res) {
		const project = await Project.create(req.body);

		return res.json(project);
	}

	async findOne(req, res) {
		const project = await Project.findOne({ where: { id: req.params.id } });

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
		const project = await Project.update(updatedProject, {
			where: { id: req.params.id },
			returning: true,
			plain: true,
		});

		//1 because of an null
		return res.json(project[1]);
	}

	// Delete a  Project
	async delete(req, res) {
		console.log(req.query);

		//Find from the route id and deletes the object
		await Project.destroy({ where: { id: req.params.id } });

		return res.json();
	}
}

export default new ProjectController();
