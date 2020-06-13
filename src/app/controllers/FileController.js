import File from '../models/File';

// File controller that will store all the recived files
class FileController {
	//Store a given File
	async create(req, res) {
		const { originalname: name, filename: path } = req.file;
		console.log(name, path);
		const file = await File.create({ name, path });

		return res.json(file);
	}
}

export default new FileController();
