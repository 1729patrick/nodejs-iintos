import HelpEmail from '../jobs/HelpEmail';
import Queue from '../../lib/Queue';

class HelpController {
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
