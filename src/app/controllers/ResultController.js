import Result from '../models/Result';
import ResultFile from '../models/ResultFile';
import File from '../models/File';
import News from '../models/News';

/**
 * Controller for the all the projects results
 *
 * @class ResultController
 */
class ResultController {
	/**
	 *
	 * Return all the results from a single project, given its id in the params
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 */
	async index(req, res) {
		const projectId = req.params.id;

		const results = await Result.findAll({
			where: { projectId },
			include: [
				{
					model: ResultFile,
					as: 'resultFile',
					include: [
						{
							model: File,
							as: 'file',
						},
					],
				},
				{ model: News, as: 'news' },
			],
			order: [['createdAt', 'DESC']],
		});

		const formattedResult = results.map(
			({ id, title, description, projectId, resultFile, news }) => ({
				id,
				title,
				description,
				projectId,
				showSendNews: !news?.length,
				files: resultFile
					.filter(({ file }) => file.name)
					.map(({ file }) => ({
						id: file.id,
						url: file.url,
						name: file.name,
					})),
				links: resultFile
					.filter(({ file }) => file.link)
					.map(({ file }) => file.link),
			})
		);

		return res.json(formattedResult);
	}

	/**
	 * Create a new Result for a project
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 */
	async create(req, res) {
		const { files, links, ...result } = req.body;
		const createdResult = await Result.create(result);

		const filesLinks = await Promise.all(
			links.map(link => File.create({ name: '', path: '', link }))
		);

		await Promise.all(
			[...files, ...filesLinks.map(({ id }) => id)].map(fileId =>
				ResultFile.create({ fileId, resultId: createdResult.id })
			)
		);

		return res.json(createdResult);
	}

	/**
	 * Deletes a project result given it's id by params
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 */
	async delete(req, res) {
		const { id } = req.params;

		await ResultFile.destroy({ where: { resultId: id } });
		await Result.destroy({ where: { id } });

		return res.json();
	}

	/**
	 * Updates a project result given it's id
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 */
	async update(req, res) {
		// get from the body the consts
		const { title, description, files, links } = req.body;
		const { id } = req.params;

		// create a object
		const updatedResult = {
			title,
			description,
		};

		// Find from the route id and updates the object
		const createdResult = await Result.update(updatedResult, {
			where: { id },
			returning: true,
			plain: true,
		});

		await ResultFile.destroy({ where: { resultId: id } });

		const filesLinks = await Promise.all(
			links.map(link => File.create({ name: '', path: '', link }))
		);

		await Promise.all(
			[...files, ...filesLinks.map(({ id }) => id)].map(fileId =>
				ResultFile.create({ fileId, resultId: createdResult[1].id })
			)
		);

		// 1 because of an random null
		return res.json(createdResult[1]);
	}
}

export default new ResultController();
