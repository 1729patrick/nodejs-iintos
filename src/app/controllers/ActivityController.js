import Activity from '../models/Activity';
import ActivityUser from '../models/ActivityUser';
import ProjectUser from '../models/ProjectUser';
import User from '../models/User';

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
			],
		});

		const formattedAcitivities = activities.map(
			({ activityUser, id, title, description, startDate, endDate }) => {
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
		const { students, professors, ...activity } = req.body;
		const creattedActivity = await Activity.create(activity);

		const users = new Set([
			...students.map(v => +v),
			...professors.map(v => +v),
		]);
		const validUsers = [...users].filter(v => v);
		await Promise.all(
			validUsers.map(projectUserId => {
				return ActivityUser.create({
					activityId: creattedActivity.id,
					projectUserId,
				});
			})
		);

		return res.json(creattedActivity);
	}

	/**
	 * Deletes a activity given its id
	 * @param {*} req
	 * @param {*} res
	 */
	async delete(req, res) {
		try {
			await Activity.destroy({ where: { id: req.params.id } });

			return res.json();
		} catch (e) {
			return res.status(401).json({
				error: 'You must remove all participants before removing',
			});
		}
	}

	async update(req, res) {
		const { id } = req.params;
		const { title, description, students, professors } = req.body;

		//Find from the route id and updates the object
		await Activity.update(
			{ title, description },
			{
				where: { id },
				returning: true,
				plain: true,
				raw: true,
			}
		);

		await ActivityUser.destroy({ where: { activityId: id } });
		const users = new Set([
			...students.map(v => +v),
			...professors.map(v => +v),
		]);
		const validUsers = [...users].filter(v => v);

		await Promise.all(
			validUsers.map(projectUserId => {
				return ActivityUser.create({
					activityId: id,
					projectUserId,
				});
			})
		);

		return res.json(req.body);
	}
}

export default new ActivityController();
