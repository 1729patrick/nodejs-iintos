import Project from '../models/Project';
import School from '../models/School';
import ProjectUser from '../models/ProjectUser';
import SchoolProject from '../models/SchoolProject';
import User from '../models/User';
import { fn, col, Op } from 'sequelize';

// Project controller that returns the essencial information
class ProjectController {
	//Returns all the projects
	async index(req, res) {
		const { avaliable = false } = req.query;

		let include = {};
		if (req.role === 'Coordinator') {
			if (JSON.parse(avaliable)) {
				include = {
					attributes: {
						include: [
							[fn('COUNT', col('schoolProject.id')), 'schoolProjectCount'],
						],
					},
					include: [
						{
							model: SchoolProject,
							as: 'schoolProject',
							where: {
								schoolId: { [Op.ne]: req.schoolId },
							},
						},
					],
					group: ['schoolProject.id', 'Project.id'],
				};
			} else {
				include = {
					include: [
						{
							model: SchoolProject,
							as: 'schoolProject',
							where: { schoolId: req.schoolId },
						},
					],
				};
			}
		} else if (req.role === 'Professor') {
			include = {
				include: [
					{
						model: ProjectUser,
						as: 'projectUser',
						where: { userId: req.userId },
					},
				],
			};
		}

		let projects = await Project.findAll({
			...include,
		});

		if (JSON.parse(avaliable)) {
			projects = projects.filter(project => {
				const { schoolProjectCount } = project.toJSON();
				return schoolProjectCount <= 1;
			});
		}

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
		// if there is a school, it associates with it
		if (currentUser.schoolId !== null) {
			const schoolProject = await SchoolProject.create({
				projectId: project.id,
				schoolId: currentUser.schoolId,
			});
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
		try {
			//Find from the route id and deletes the object
			await Project.destroy({ where: { id: req.params.id } });

			return res.json();
		} catch (e) {
			return res.status(401).json({
				error: 'Remove all relationships before deleting the project',
			});
		}
	}
}

export default new ProjectController();
