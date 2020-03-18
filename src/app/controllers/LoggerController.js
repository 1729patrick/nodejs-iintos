import Log from '../models/Log';
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
		const results = await Log.findAll({});
		console.log(results);
		return res.json(results);
	}
}

export default new LoggerController();
