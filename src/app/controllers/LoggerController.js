import Log from '../schemas/Log';
import File from '../models/File';
import User from '../models/User';

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
	async index1(req, res) {
		const results = await Log.find();

		// const result = results.map(
		// 	({ id, method, path, body, params, createdAt, user }) => {
		// 		return {
		// 			id,
		// 			method,
		// 			path,
		// 			body,
		// 			params,
		// 			createdAt,
		// 			user,
		// 		};
		// 	}
		// );

		return res.json(results);
	}

	/**
	 * Gets all the Logs
	 *
	 * @param {*} req The request object
	 * @param {*} res The request object
	 */
	async index(req, res) {
		const aggregatorOpts = [
			{
				$match: {
					userId: {
						$not: /^public/,
					},
				},
			},
			{
				$group: {
					_id: '$userId',
					dates: {
						$push: {
							$dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
						},
					},
					count: { $sum: 1 },
				},
			},
			{ $sort: { dates: -1 } },
		];

		const results = await Log.aggregate(aggregatorOpts).exec();

		const resultsMapped = results.map(({ _id, dates }) => {
			return {
				userId: _id,
				dates: [...new Set(dates)],
			};
		});

		const usersIds = resultsMapped.reduce(
			(prev, { userId }) => [...prev, userId],
			[]
		);

		const users_ = await User.findAll({ where: { id: usersIds } });

		const result = resultsMapped.map(({ userId, dates }) => {
			const { name, email } = users_.find(({ id }) => id === +userId) || {};

			return {
				user: { name, email },
				dates,
			};
		});

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

		const filesFormatted = files.map(file => {
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
