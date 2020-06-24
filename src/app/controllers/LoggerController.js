import Log from '../schemas/Log';
import File from '../models/File';
//import OutputResultFile from '../models/OutputResultFile';
/**
 * Controller for the public Stem
 */
class LoggerController {
	/**
	 * Gets all the Logs
	 *
	 * @param {} req
	 * @param {*} res
	 */
	async index(req, res) {
		const results = await Log.find();

		const result = results.map(
			({ id, method, path, body, params, createdAt }) => {
				return {
					id,
					method,
					path,
					body,
					params,
					createdAt,
				};
			}
		);

		return res.json(result);
	}

	async files(req, res) {
		const path = new RegExp('/api/files', 'i');

		// const results = await Log.find({ path });

		const aggregatorOpts = [
			{
				$match: { path },
			},
			{
				$group: {
					_id: '$path',
					count: { $sum: 1 },
				},
			},
		];

		const results = await Log.aggregate(aggregatorOpts).exec();

		const filesPaths = results.map(({ _id }) => _id.replace('/api/files/', ''));

		const files = await File.findAll({
			where: {
				path: filesPaths,
			},
		});

		const filesFormatted = files.map(file => {
			file = JSON.parse(JSON.stringify(file));

			const log = results.find(({ _id }) => _id.includes(file.path));

			return { ...file, count: log.count };
		});

		return res.json(filesFormatted);
	}
}

export default new LoggerController();
