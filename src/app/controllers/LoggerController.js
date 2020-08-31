import Log from '../schemas/Log';
import File from '../models/File';

/**
 * Controller for the Logger
 *
 * @class LoggerController
 */
class LoggerController {
	/**
	 * Gets all the Logs
	 *
	 * @param {*} req The request object
	 * @param {*} res The request object
	 */
	async index(req, res) {
		const results = await Log.find();

		const result = results.map(
			({ id, method, path, body, params, createdAt, user }) => {
				return {
					id,
					method,
					path,
					body,
					params,
					createdAt,
					user,
				};
			}
		);

		return res.json(result);
	}

	/**
	 * Gets the files downloads
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 *
	 * @memberof LoggerController
	 */
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

		const filesFormatted = files.map((file) => {
			file = JSON.parse(JSON.stringify(file));

			const log = results.find(({ _id }) => _id.includes(file.path));

			return { ...file, count: log.count };
		});

		return res.json(
			filesFormatted.map(({ url, name, count }) => ({ url, name, count }))
		);
	}
}

export default new LoggerController();
