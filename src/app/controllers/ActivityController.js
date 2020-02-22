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

		return res.json(activities);
	}
	/**
	 * Creates a new activty in the project
	 *
	 * @param {Requesta parameters} req
	 * @param {*} res
	 */
	async create(req, res) {
		const activity = await Activity.create(req.body);

		return res.json(activity);
	}

	/**
	 * Deletes a activity given its id
	 * @param {*} req
	 * @param {*} res
	 */
	async delete(req, res) {
		await Activity.destroy({ where: { id: req.params.id } });

		return res.json();
	}

	async update(req, res) {
		const { id } = req.params;
		const { title, description } = req.body;

		//Find from the route id and updates the object
		const updatedActivity = await Activity.update(
			{ title, description },
			{
				where: { id },
				returning: true,
				plain: true,
				raw: true,
			}
		);

		return res.json(updatedActivity);
	}
}

export default new ActivityController();
