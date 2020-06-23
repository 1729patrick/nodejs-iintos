import OutputResult from '../models/OutputResult';
import OutputResultFile from '../models/OutputResultFile';
import File from '../models/File';
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
		const results = await OutputResult.findAll({
			order: [['id', 'ASC']],
			include: [
				{
					model: OutputResultFile,
					as: 'outputResultFile',
					include: [
						{
							model: File,
							as: 'file',
						},
					],
				},
			],
		});

		const formattedResult = results.map(
			({ id, title, description, outputResultFile }) => ({
				id,
				title,
				description,
				files: outputResultFile.map(({ id, file }) => ({
					id: file.id,
					url: file.url,
					name: file.name,
				})),
			})
		);

		return res.json(formattedResult);
	}

	/**
	 * Create a new Output Result
	 * @param {*} req
	 * @param {*} res
	 */
	async create(req, res) {
		const { files, ...result } = req.body;
		const createdResult = await OutputResult.create(result);
		await Promise.all(
			files.map(fileId =>
				OutputResultFile.create({ fileId, outputResultId: createdResult.id })
			)
		);

		return res.json(createdResult);
	}
	/**
	 * Delete an output result given it's id by params
	 * @param {*} req
	 * @param {*} res
	 */
	async delete(req, res) {
		const outputResultId = req.params.id;
		await OutputResultFile.destroy({ where: { outputResultId } });
		await OutputResult.destroy({ where: { id: outputResultId } });

		return res.json();
	}
	/**
	 *	Update an output result given it's id
	 * @param {*} req
	 * @param {*} rest
	 */
	async update(req, res) {
		// get from the body the consts
		const { title, description, files } = req.body;
		const outputResultId = req.params.id;

		// create a object
		const updatedResult = {
			title,
			description,
		};

		//Find from the route id and updates the object
		const result = await OutputResult.update(updatedResult, {
			where: { id: outputResultId },
			returning: true,
			plain: true,
		});

		await OutputResultFile.destroy({ where: { outputResultId } });

		await Promise.all(
			files.map(fileId => OutputResultFile.create({ fileId, outputResultId }))
		);

		// 1 because of an random null
		return res.json(result[1]);
	}
}

export default new OutputResultController();
