import Project from '../models/Project';
import ProjectUser from '../models/ProjectUser';
import SchoolProject from '../models/SchoolProject';
import User from '../models/User';
import Result from '../models/Result';
import ResultFile from '../models/ResultFile';
import { Op } from 'sequelize';
import Queue from '../../lib/Queue';
import NewProjectEmail from '../jobs/NewProjectEmail';

// Project controller that returns the essencial information
class ProjectController {
	//Returns all the projects
	async index(req, res) {
		const { avaliable = false, destination = 'MOBILITY' } = req.query;

		let include = {};
		if (req.role === 'Coordinator') {
			include = {
				include: [
					{
						model: SchoolProject,
						as: 'schoolProject',
					},
				],
			};
		} else if (req.role === 'Professor') {
			include = {
				include: [
					{
						model: ProjectUser,
						as: 'projectUser',
					},
				],
			};
		}

		let where = {};
		if (destination === 'IINTOS') {
			where = { where: { type: 'Output' } };
		} else if (JSON.parse(avaliable)) {
			where = { where: { type: { [Op.ne]: 'Output' }, campaing: true } };
		} else {
			where = { where: { type: { [Op.ne]: 'Output' } } };
		}

		let projects = await Project.findAll({
			...include,
			...where,
		});

		if (req.role === 'Professor') {
			if (JSON.parse(avaliable)) {
				projects = projects.filter(project => {
					project = project.toJSON();

					return !(project.projectUser || []).find(
						project => project.userId === req.userId
					);
				});
			} else {
				projects = projects.filter(project => {
					project = project.toJSON();

					return (project.projectUser || []).find(
						project => project.userId === req.userId
					);
				});
			}
		} else if (req.role === 'Coordinator') {
			if (JSON.parse(avaliable)) {
				projects = projects.filter(project => {
					project = project.toJSON();

					return !(project.schoolProject || []).find(
						project => project.schoolId === req.schoolId
					);
				});
			} else {
				projects = projects.filter(project => {
					project = project.toJSON();

					return (project.schoolProject || []).find(
						project => project.schoolId === req.schoolId
					);
				});
			}
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

		// if there is a school, it associates with it
		if (req.schoolId !== null) {
			await SchoolProject.create({
				projectId: project.id,
				schoolId: req.schoolId,
			});
		}

		//================ Send the email ================

		let userList = await User.findAll({
			attributes: ['email'],
			where: { roleId: 2, active: true }, // 2 Coordinator because of id in the db
		});

		userList = userList.map(({ email }) => email);

		// Send email to every coordiantor about the new project
		userList.forEach(email =>
			Queue.add(NewProjectEmail.key, {
				newProject: {
					id: project.id,
					title: project.title,
					goal: project.goal,
					type: project.type,
				},
				receiver: { email: email },
			})
		);

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
			ageRangeStart,
			ageRangeEnd,
			type,
			title,
			campaing,
			endDate,
			startDate,
		} = req.body;

		const updatedProject = {
			global,
			description,
			links,
			ageRangeStart,
			ageRangeEnd,
			type,
			title,
			endDate,
			startDate,
			campaing,
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
			const projectId = req.params.id;
			//Find from the route id and deletes the object
			await ProjectUser.destroy({ where: { projectId } });

			const results = await Result.findAll({ where: { projectId } });

			await Promise.all(
				results.map(({ id: resultId }) =>
					ResultFile.destroy({ where: { resultId } })
				)
			);

			await Result.destroy({ where: { projectId } });

			await SchoolProject.destroy({ where: { projectId } });

			// const activitites = await Activity.findAll({ where: { projectId } });

			// await Promise.all(
			// 	activitites.map(({ id: activityId }) => {
			// 		ActivityUser.destroy({ where: { activityId } });
			// 	})
			// );

			// await Promise.all(
			// 	activitites.map(({ id: activityId }) => {
			// 		ActivityFile.destroy({ where: { activityId } });
			// 	})
			// );

			// await Activity.destroy({ where: { projectId } });
			await Project.destroy({ where: { id: projectId } });

			return res.json();
		} catch (e) {
			return res.status(401).json({
				error: 'Remove all activities before deleting the project',
			});
		}
	}
}

export default new ProjectController();
