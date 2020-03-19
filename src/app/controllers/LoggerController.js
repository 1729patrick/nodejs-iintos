import Log from '../models/Log';
import User from '../models/User';
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
		const results = await Log.findAll({
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['name'],
				},
			],
		});

		const x = results.map(
			({ id, method, path, body, params, user, createdAt }) => {
				return {
					id,
					method,
					path,
					body,
					params,
					username: user.name,
					createdAt,
				};
			}
		);
		return res.json(x);
	}
}

export default new LoggerController();
