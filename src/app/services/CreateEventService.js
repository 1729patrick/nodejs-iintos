import Event from '../models/Event';
import EventSession from '../models/EventSession';
import EventFile from '../models/EventFile';
import File from '../models/File';

class CreateEventService {
	async run({ event, sessions }) {
		const createdEvent = await Event.create(event);

		const sessionsWithEventId = sessions.map(session => ({
			...session,
			eventId: createdEvent.id,
		}));

		const createdEventSessions = await EventSession.bulkCreate(
			sessionsWithEventId
		);

		const eventFilesToCreate = event.files.map(fileId => ({
			fileId,
			eventId: createdEvent.id,
		}));

		const files = await EventFile.bulkCreate(eventFilesToCreate);

		let eventSessionsFilesToCreate = [];

		sessionsWithEventId.forEach(async (eventSession, index) => {
			eventSession.files.forEach(fileId => {
				if (!eventSessionsFilesToCreate.find(e => e.fileId === fileId))
					eventSessionsFilesToCreate.push({
						fileId,
						eventSessionId: createdEventSessions[index].id,
					});
			});

			const filesCreatted = await File.bulkCreate(
				eventSession.links.map(link => ({ path: '', name: '', link }))
			);

			filesCreatted.forEach(({ id: fileId }) => {
				if (!eventSessionsFilesToCreate.find(e => e.fileId === fileId))
					eventSessionsFilesToCreate.push({
						fileId,
						eventSessionId: createdEventSessions[index].id,
					});
			});

			files.push(await EventFile.bulkCreate(eventSessionsFilesToCreate));
			eventSessionsFilesToCreate = [];
		});

		return { createdEvent, createdEventSessions, files };
	}
}

export default new CreateEventService();
