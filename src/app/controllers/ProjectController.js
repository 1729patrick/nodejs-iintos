import Project from '../models/Project';
import School from '../models/School';
import SchoolProject from '../models/SchoolProject';
import User from '../models/User';

// Project controller that returns the essencial information
class ProjectController {
	//Returns all the projects
	async index(req, res) {
		const projects = await Project.findAll();

		return res.json(projects);
	}

	/**
	 * Create a new Project
	 * @param {*} req
	 * @param {*} res
	 */
	async create(req, res) {
		//creates a new project
		const project = await Project.create(req.body);

		//Adds the school of the current user to the project
		const id = req.userId;

		const currentUser = await User.findOne({
			where: { id },
			attributes: {
				exclude: ['passwordHash'],
			},
			include: [
				{
					model: School,
					as: 'school',
					attributes: ['name'],
				},
			],
			raw: true,
			nest: true,
		});
		console.log(currentUser);
		// if there is a school, it associates with it
		if (currentUser.schoolId !== null) {
			const schoolProject = await SchoolProject.create({
				projectId: project.id,
				schoolId: currentUser.schoolId,
			});
			console.log(schoolProject);
		}
		//Returns a the newly created project
		return res.json(project);
	}

	async findOne(req, res) {
		const project = await Project.findOne({
			where: { id: req.params.id },
			include: [],
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
		//Find from the route id and deletes the object
		await Project.destroy({ where: { id: req.params.id } });

		return res.json();
	}
}

export default new ProjectController();
