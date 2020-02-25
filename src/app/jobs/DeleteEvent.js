import Api from '../../lib/Axios';
import { Op } from 'sequelize';
import ActivityUser from '../models/ActivityUser';

class DeleteEvent {
	get key() {
		return 'DeleteEvent';
	}

	async handle({ data }) {
		const { googleEventId, email } = data;

		await Api.delete(`events/${googleEventId}`, {
			headers: { userID: email },
		});
	}
}

export default new DeleteEvent();
