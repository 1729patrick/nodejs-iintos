import Activity from '../models/Activity';
import ActivityUser from '../models/ActivityUser';
import ActivityFile from '../models/ActivityFile';
import File from '../models/File';
import ProjectUser from '../models/ProjectUser';
import User from '../models/User';
import Queue from '../../lib/Queue';

import CreateEvent from '../jobs/CreateEvent';
import DeleteEvent from '../jobs/DeleteEvent';
/**
 * Activity controller
 */
class ActivityController {
	/**
	 * Gets all the activities from a given id
	 *
	 * @param {*} req Request
	 * @param {*} res Response
	 */
	async index(req, res) {
		const projectId = req.params.id;

		const activities = await Activity.findAll({
			where: { projectId },
			include: [
				{
					model: ActivityUser,
					as: 'activityUser',
					include: {
						model: ProjectUser,
						as: 'projectUser',
						include: {
							model: User,
							as: 'professor',
						},
					},
				},
				{
					model: ActivityFile,
					as: 'activityFile',
					include: [
						{
							model: File,
							as: 'file',
						},
					],
				},
			],
		});

		const formattedAcitivities = activities.map(
			({
				activityUser,
				id,
				title,
				description,
				startDate,
				endDate,
				activityFile,
			}) => {
				let professors = [],
					students = [];
				activityUser.forEach(({ projectUser, ...user }) => {
					if (!projectUser) return;
					if (projectUser.professor) {
						return professors.push({
							id: projectUser.id,
							name: projectUser.professor.name,
						});
					}

					return students.push({
						id: projectUser.id,
						name: projectUser.studentName,
					});
				});

				return {
					id,
					title,
					description,
					startDate,
					endDate,
					students,
					professors,
					files: activityFile.map(({ id, file }) => ({
						id,
						url: file.url,
						name: file.name,
					})),
					studentsStr: students.map(({ name }) => name).join(', '),
					professorsStr: professors.map(({ name }) => name).join(', '),
				};
			}
		);

		return res.json(formattedAcitivities);
	}
	/**
	 * Creates a new activty in the project
	 *
	 * @param {Requesta parameters} req
	 * @param {*} res
	 */
	async create(req, res) {
		const { students, professors, files, ...activity } = req.body;
		const creattedActivity = await Activity.create(activity);

		const users = new Set([
			...students.map(v => +v),
			...professors.map(v => +v),
		]);

		const activityId = creattedActivity.id;

		const validUsers = [...users].filter(v => v);
		const activitityUsers = await Promise.all(
			validUsers.map(projectUserId => {
				return ActivityUser.create({
					activityId,
					projectUserId,
				});
			})
		);

		await Promise.all(
			files.map(fileId => ActivityFile.create({ fileId, activityId }))
		);

		const projectUsers = await Promise.all(
			professors
				.filter(p => p)
				.map(professorId =>
					ProjectUser.findByPk(professorId, {
						include: [{ model: User, as: 'professor' }],
					})
				)
		);

		const professorsEmails = projectUsers.map(({ id, professor }) => {
			const activity = activitityUsers.find(
				({ projectUserId }) => projectUserId === id
			);

			return {
				email: professor.email,
				activityUserId: activity ? activity.id : null,
			};
		});

		Queue.add(CreateEvent.key, { participants: professorsEmails, ...activity });

		return res.json(creattedActivity);
	}

	/**
	 * Deletes a activity given its id
	 * @param {*} req
	 * @param {*} res
	 */
	async delete(req, res) {
		const activityId = req.params.id;

		const acitivityUsers = await ActivityUser.findAll({
			where: { activityId },
			include: [
				{
					model: ProjectUser,
					as: 'projectUser',
					include: [
						{
							model: User,
							as: 'professor',
						},
					],
				},
			],
		});

		await ActivityFile.destroy({ where: { activityId } });

		await Promise.all(
			acitivityUsers.map(acitivityUser => {
				const { professor } = acitivityUser.projectUser;
				const event = {
					googleEventId: acitivityUser.googleEventId,
					email: professor ? professor.email : '',
				};

				Queue.add(DeleteEvent.key, event);
				return acitivityUser.destroy();
			})
		);

		await Activity.destroy({ where: { id: activityId } });

		return res.json(acitivityUsers);
	}

	async update(req, res) {
		const activityId = req.params.id;

		const acitivityUsers = await ActivityUser.findAll({
			where: { activityId },
			include: [
				{
					model: ProjectUser,
					as: 'projectUser',
					include: [
						{
							model: User,
							as: 'professor',
						},
					],
				},
			],
		});

		await Promise.all(
			acitivityUsers.map(acitivityUser => {
				const { professor } = acitivityUser.projectUser;
				const event = {
					googleEventId: acitivityUser.googleEventId,
					email: professor ? professor.email : '',
				};

				Queue.add(DeleteEvent.key, event);
				return acitivityUser.destroy();
			})
		);

		const {
			files,
			students,
			professors,
			title,
			description,
			startDate,
			endDate,
		} = req.body;

		await Activity.update(
			{ title, description, startDate, endDate },
			{
				where: { id: activityId },
			}
		);

		await ActivityFile.destroy({ where: { activityId } });
		await Promise.all(
			files.map(fileId => ActivityFile.create({ fileId, activityId }))
		);

		const users = new Set([
			...students.map(v => +v),
			...professors.map(v => +v),
		]);

		const validUsers = [...users].filter(v => v);
		const activitityUsers = await Promise.all(
			validUsers.map(projectUserId => {
				return ActivityUser.create({
					activityId,
					projectUserId,
				});
			})
		);

		const projectUsers = await Promise.all(
			professors
				.filter(p => p)
				.map(professorId =>
					ProjectUser.findByPk(professorId, {
						include: [{ model: User, as: 'professor' }],
					})
				)
		);

		const professorsEmails = projectUsers.map(({ id, professor }) => {
			const activity = activitityUsers.find(
				({ projectUserId }) => projectUserId === id
			);

			return {
				email: professor ? professor.email : '',
				activityUserId: activity ? activity.id : null,
			};
		});

		Queue.add(CreateEvent.key, {
			participants: professorsEmails,
			title,
			description,
			startDate,
			endDate,
		});

		return res.json(professorsEmails);
	}
}

export default new ActivityController();
