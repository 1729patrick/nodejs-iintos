import Log from '../schemas/Log';
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
}

export default new LoggerController();
