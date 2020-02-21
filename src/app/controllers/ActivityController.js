import Activity from '../models/Activity';

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
	async delete(req, res){

		await Activity.destroy({ where: { id: req.params.id } });

	}

}

export default new ActivityController();
