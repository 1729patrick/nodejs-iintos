import HelpEmail from '../jobs/HelpEmail';
import Queue from '../../lib/Queue';

/**
 * Help controller send email to admin when user needs help
 *
 * @class HelpController
 */
class HelpController {
	/**
	 * Send the help email to admin
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 *
	 * @memberof HelpController
	 */
	async create(req, res) {
		{
			const { email, body } = req.body;

			Queue.add(HelpEmail.key, {
				email,
				body,
			});
			return res.json();
		}
	}
}

export default new HelpController();
