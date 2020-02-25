import ActivityFile from '../models/ActivityFile';
// File controller that will store all the recived files
class FileController {
	//Store a given File
	async create(req, res) {
		const { activityId } = req.params;
		const { fileId } = req.body;

		const activityFile = await ActivityFile.create({ activityId, fileId });

		return res.json(activityFile);
	}

	async delete(req, res) {
		const { activityFileId } = req.params;

		await ActivityFile.destroy({
			where: { id: activityFileId },
		});

		return res.json();
	}
}

export default new FileController();
