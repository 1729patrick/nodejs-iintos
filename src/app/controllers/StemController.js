import Stem from '../models/Stem';
//import OutputResultFile from '../models/OutputResultFile';

/**
 * Controller for the public Stem
 *
 * @class StemController
 */
class StemController {
	/**
	 * Gets all the stem in the public area
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 */
	async index(req, res) {
		const results = await Stem.findAll({ order: [['createdAt', 'DESC']] });
		return res.json(results);
	}

	/**
	 * Create a new Stem
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 */
	async create(req, res) {
		const createdResult = await Stem.create(req.body);

		return res.json(createdResult);
	}
	/**
	 * Delete an stem given it's id by params
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 */
	async delete(req, res) {
		const stemId = req.params.id;
		await Stem.destroy({ where: { id: stemId } });

		return res.json();
	}
	/**
	 *	Update an stem given it's id
	 * @param {*} req
	 * @param {*} rest
	 */
	async update(req, res) {
		// get from the body the consts
		const { title, link } = req.body;
		const stemId = req.params.id;

		// create a object
		const updatedResult = {
			title,
			link,
		};

		//Find from the route id and updates the object
		const result = await Stem.update(updatedResult, {
			where: { id: stemId },
			returning: true,
			plain: true,
		});

		// 1 because of an random null
		return res.json(result[1]);
	}
}

export default new StemController();
