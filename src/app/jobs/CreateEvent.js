import Api from '../../lib/Axios';
import { Op } from 'sequelize';
import ActivityUser from '../models/ActivityUser';
class CancellationMail {
	get key() {
		return 'CreateEvent';
	}

	async handle({ data }) {
		const { emails, title, description, startDate, endDate } = data;

		await Promise.all(
			emails.map(email => {
				return Api.post(
					'events',
					{
						description,
						summary: title,
						start: {
							date: startDate.split('T')[0],
						},
						end: {
							date: endDate.split('T')[0],
						},
					},
					{ headers: { userID: email } }
				);
			})
		);
	}
}

export default new CancellationMail();
