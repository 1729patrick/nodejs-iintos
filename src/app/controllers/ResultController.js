import Result from '../models/Result';

/**
 * Controller for the all the projects results
 */
class ResultController {
	/**
	 *
	 * /get
	 * Return all the results from a single project, given its id in the params
	 * @param {*} req
	 * @param {*} res
	 */
	async index(req, res) {
		const projectId = req.params.id;

		const results = await Result.findAll({
			where: { projectId },
		});

		return res.json(results);
	}

	/**
	 * Create a new Result for a project
	 * @param {*} req
	 * @param {*} res
	 */
	async create(req, res) {
		const result = await Result.create(req.body);

		return res.json(result);
	}
	/**
	 * Deletes a project result given it's id by params
	 * @param {*} req
	 * @param {*} res
	 */
	async delete(req, res) {
		await Result.destroy({ where: { id: req.params.id } });

		return res.json();
	}

	/**
	 * Updates a project result given it's id
	 * @param {*} req
	 * @param {*} res
	 */
	async update(req, res) {
		// get from the body the consts
		const { title, description } = req.body;

		// create a object
		const updatedResult = {
			title,
			description,
		};

		//Find from the route id and updates the object
		const result = await Result.update(updatedResult, {
			where: { id: req.params.id },
			returning: true,
			plain: true,
		});

		// 1 because of an random null
		return res.json(result[1]);
	}
}

export default new ResultController();
