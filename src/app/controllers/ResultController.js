import Result from '../models/Result';
import ResultFile from '../models/ResultFile';
import File from '../models/File';

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
			include: {
				model: ResultFile,
				as: 'resultFile',
				include: [
					{
						model: File,
						as: 'file',
					},
				],
			},
		});

		const formattedResult = results.map(
			({ id, title, description, projectId, resultFile }) => ({
				id,
				title,
				description,
				projectId,
				files: resultFile.map(({ id, file }) => ({
					id: file.id,
					url: file.url,
					name: file.name,
				})),
			})
		);

		return res.json(formattedResult);
	}

	/**
	 * Create a new Result for a project
	 * @param {*} req
	 * @param {*} res
	 */
	async create(req, res) {
		const { files, ...result } = req.body;
		const createdResult = await Result.create(result);

		await Promise.all(
			files.map(fileId =>
				ResultFile.create({ fileId, resultId: createdResult.id })
			)
		);

		return res.json(createdResult);
	}

	/**
	 * Deletes a project result given it's id by params
	 * @param {*} req
	 * @param {*} res
	 */
	async delete(req, res) {
		const { id } = req.params;

		await ResultFile.destroy({ where: { resultId: id } });
		await Result.destroy({ where: { id } });

		return res.json();
	}

	/**
	 * Updates a project result given it's id
	 * @param {*} req
	 * @param {*} res
	 */
	async update(req, res) {
		// get from the body the consts
		const { title, description, files } = req.body;
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
		await Promise.all(
			files.map(fileId =>
				ResultFile.create({ fileId, resultId: createdResult[1].id })
			)
		);

		// 1 because of an random null
		return res.json(createdResult[1]);
	}
}

export default new ResultController();
