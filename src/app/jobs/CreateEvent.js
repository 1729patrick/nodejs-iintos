import Api from '../../lib/Axios';
import { parseISO, addDays, format } from 'date-fns';
import ActivityUser from '../models/ActivityUser';

class CreteEvent {
	get key() {
		return 'CreateEvent';
	}

	async handle({ data }) {
		const { participants, title, description, startDate, endDate } = data;

		const events = await Promise.all(
			participants.map(({ email }) => {
				return Api.post(
					'events',
					{
						description,
						summary: title,
						start: {
							date: format(parseISO(startDate), 'yyyy-MM-dd'),
						},
						end: {
							date: format(addDays(parseISO(endDate), 1), 'yyyy-MM-dd'),
						},
					},
					{ headers: { userID: email } }
				);
			})
		);

		const createdEvents = events.map(response => {
			const { event, userID } = response.data;
			return { eventID: event.id, userID };
		});

		await Promise.all(
			createdEvents.map(({ eventID, userID }) => {
				const { activityUserId } = participants.find(
					({ email }) => email === userID
				);

				return ActivityUser.update(
					{
						googleEventId: eventID,
					},
					{
						where: { id: activityUserId },
					}
				);
			})
		);
	}
}

export default new CreteEvent();
