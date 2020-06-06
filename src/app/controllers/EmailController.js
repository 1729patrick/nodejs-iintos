import Queue from '../../lib/Queue';
import UserToUserEmail from '../jobs/UserToUserEmail';
/**
 * Controller for the public Stem
 */
class EmailController {
	/**
	 * Create a new Stem
	 * @param {*} req
	 * @param {*} res
	 */
	async send(req, res) {
		const data = req.body;

		Queue.add(UserToUserEmail.key, data);

		return res.json();
	}
}

export default new EmailController();
