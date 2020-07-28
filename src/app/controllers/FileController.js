import File from '../models/File';

/**
 * File controller that will store all the received files
 *
 * @class FileController
 */
class FileController {
	/**
	 * Store a given File
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 *
	 * @memberof FileController
	 */
	async create(req, res) {
		const { originalname: name, filename: path } = req.file;

		const file = await File.create({ name, path });

		return res.json(file);
	}
}

export default new FileController();
