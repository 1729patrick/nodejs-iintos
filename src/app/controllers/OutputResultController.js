import OutputResult from '../models/OutputResult';
/**
 * Controller for the public output results
 */
class OutputResultController {
	/**
	 * Gets all the Output Results in the public area
	 * @param {} req
	 * @param {*} res
	 */
	async index(req, res) {
		const results = await OutputResult.findAll();
		console.log(results);
		return res.json(results);
	}

	/**
	 * Create a new Output Result
	 * @param {*} req
	 * @param {*} res
	 */
	async create(req, res) {
		const result = await OutputResult.create(req.body);
		console.log(result);

		return res.json(result);
	}
	/**
	 * Delete an output result given it's id by params
	 * @param {*} req
	 * @param {*} res
	 */
	async delete(req, res) {
		await OutputResult.destroy({ where: { id: req.params.id } });

		return res.json();
	}
	/**
	 *	Update an output result given it's id
	 * @param {*} req
	 * @param {*} rest
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
		const result = await OutputResult.update(updatedResult, {
			where: { id: req.params.id },
			returning: true,
			plain: true,
		});

		// 1 because of an random null
		return res.json(result[1]);
	}
}

export default new OutputResultController();
