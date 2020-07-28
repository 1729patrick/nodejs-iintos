import Queue from '../../lib/Queue';
import UserToUserEmail from '../jobs/UserToUserEmail';

/**
 * Controller for the Email notifications
 *
 * @class EmailController
 */
class EmailController {
	/**
	 * Send a email
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 */
	async send(req, res) {
		const data = req.body;

		Queue.add(UserToUserEmail.key, data);

		return res.json();
	}
}

export default new EmailController();
