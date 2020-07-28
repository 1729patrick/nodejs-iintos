import News from '../models/News';
import User from '../models/User';
import Project from '../models/Project';
import File from '../models/File';

/**
 * Controller for the public News
 *
 * @class NewsController
 */
class NewsController {
	/**
	 * Gets all the news in the public area
	 *
	 * @param {} req The request object
	 * @param {*} res The response object
	 */
	async index(req, res) {
		const results = await News.findAll({
			order: [['createdAt', 'DESC']],
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
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 */
	async create(req, res) {
		if (req.body.youtube) {
			let video_id = req.body.youtube.split('v=')[1];
			var ampersandPosition = video_id.indexOf('&');
			if (ampersandPosition != -1) {
				video_id = video_id.substring(0, ampersandPosition);
			}
		}

		const newNews = {
			title: req.body.title,
			description: req.body.description,
			link: req.body.link,
			youtube: req.body.youtube ? video_id : req.body.youtube,
			imageId: req.body.imageId,
			userId: req.body.userId,
		};
		console.log(newNews);

		const createdResult = await News.create(newNews);

		return res.json(createdResult);
	}
	/**
	 * Creates a news from a result with the project name
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 */
	async createFromResults(req, res) {
		const { title, description, userId, projectId } = req.body;
		console.log(req.body);
		//gets the project associated to the result
		const project = await Project.findOne({
			where: {
				id: projectId,
			},
		});

		// Create a new News
		const newTitle = 'Result: ' + project.title + ' - ' + title;
		const newNews = {
			title: newTitle,
			description,
			userId,
		};

		const createdResult = await News.create(newNews);

		return res.json(createdResult);
	}

	/**
	 * Delete an news given it's id by params
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 */
	async delete(req, res) {
		const newsId = req.params.id;
		await News.destroy({
			where: {
				id: newsId,
			},
		});

		return res.json();
	}
	/**
	 *	Update an news given it's id

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
			where: {
				id: newsId,
			},
			returning: true,
			plain: true,
		});

		// 1 because of an random null
		return res.json(result[1]);
	}
}

export default new NewsController();
