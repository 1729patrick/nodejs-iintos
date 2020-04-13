import News from '../models/News';
import User from '../models/User';
//import OutputResultFile from '../models/OutputResultFile';
import File from '../models/File';
/**
 * Controller for the public News
 */
class NewsController {
	/**
	 * Gets all the Output Results in the public area
	 * @param {} req
	 * @param {*} res
	 */
	async index(req, res) {
		const results = await News.findAll({
			include: [
				{
					model: File,
					as: 'image',
				},
				{
					model: User,
					as: 'author',
				},
			],
		});
		return res.json(results);
	}

	/**
	 * Create a new News
	 * @param {*} req
	 * @param {*} res
	 */
	async create(req, res) {
		const createdResult = await News.create(req.body);

		return res.json(createdResult);
	}
	/**
	 * Delete an output result given it's id by params
	 * @param {*} req
	 * @param {*} res
	 */
	async delete(req, res) {
		const newsId = req.params.id;
		await News.destroy({ where: { id: newsId } });

		return res.json();
	}
	/**
	 *	Update an output result given it's id
	 * @param {*} req
	 * @param {*} rest
	 */
	async update(req, res) {
		// get from the body the consts
		const { title, description, imageId } = req.body;
		const newsId = req.params.id;

		// create a object
		const updatedResult = {
			title,
			description,
			imageId,
		};

		//Find from the route id and updates the object
		const result = await News.update(updatedResult, {
			where: { id: newsId },
			returning: true,
			plain: true,
		});

		// 1 because of an random null
		return res.json(result[1]);
	}
}

export default new NewsController();
