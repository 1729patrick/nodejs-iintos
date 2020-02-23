import ResultFile from '../models/ResultFile';
import File from '../models/File';
/**
 * Controller for the all files of an result
 */
class ResultFileController {
	/**
	 * Get, Returns all the files from a result given it's id by the params
	 * @param {*} req
	 * @param {*} res
	 */
	async index(req, res) {
		const resultId = req.params.id;

		const files = await ResultFile.findAll({
			where: { resultId },
			attributes: ['id', 'resultId', 'fileId'],
			include: [
				{
					model: File,
					as: 'file',
					attributes: ['name', 'path', 'url'],
				},
			],
		});
		res.json(files);
	}
	/**
	 *
	 * @param {*} req
	 * @param {*} res
	 */
	async create(req, res) {
		const resultId = req.params.id;
		console.log(req);

		const { originalname: name, filename: path } = req.file;
		const file = await File.create({ name, path });

		const resultFile = await ResultFile.create({ fileId: file.id, resultId });

		return res.json(resultFile);
	}
}

export default new ResultFileController();
