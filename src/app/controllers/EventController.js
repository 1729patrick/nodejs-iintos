import Event from '../models/Event';
import EventSession from '../models/EventSession';
import EventFile from '../models/EventFile';
import CreateEventService from '../services/CreateEventService';
import File from '../models/File';

/**
 * Controller for the all the projects results
 */
class EventController {
	/**
	 *
	 * /get
	 * Return all the Events
	 * @param {*} req
	 * @param {*} res
	 */
	async index(req, res) {
		const events = await Event.findAll({
			order: [
				['date', 'ASC'],
				[{ model: EventSession, as: 'sessions' }, 'date', 'ASC'],
			],
			include: [
				{
					model: EventSession,
					as: 'sessions',
					include: [
						{
							model: EventFile,
							as: 'files',
							include: [{ model: File, as: 'file' }],
						},
					],
				},
				{
					model: EventFile,
					as: 'files',
					include: [{ model: File, as: 'file' }],
				},
			],
		});

		const eventsFormatted = events.map(event => ({
			...JSON.parse(JSON.stringify(event)),
			sessions: event.sessions?.map(session => ({
				...JSON.parse(JSON.stringify(session)),
				files: session?.files
					?.filter(({ file }) => !file.link?.length)
					?.map(({ file }) => file),
				links: session?.files
					?.filter(({ file }) => file.link?.length)
					?.map(({ file }) => file.link),
			})),

			files: event?.files?.map(({ file }) => file),
		}));

		const eventsFormatted_ = eventsFormatted.map(event => {
			const ids = {};
			const eventFiles = [];
			event.files.forEach(file => {
				if (!file.link && !ids[file.id]) {
					ids[file.id] = true;
					eventFiles.push(file);
				}
			});

			return {
				...event,
				files: eventFiles,
				sessions: event.sessions.map(session => {
					const ids_ = {};

					const sessionFiles = [];
					session.files.forEach(file => {
						if (!ids_[file.id]) {
							ids_[file.id] = true;
							sessionFiles.push(file);
						}

						if (file.link && !ids_[file.link]) {
							ids_[file.link] = true;
							sessionFiles.push(file);
						}
					});

					return {
						...session,
						files: sessionFiles,
					};
				}),
			};
		});

		return res.json(eventsFormatted_);
	}

	/**
	 * Create a new Event for a project
	 * @param {*} req
	 * @param {*} res
	 */
	async create(req, res) {
		const { event, sessions } = req.body;

		const {
			createdEvent,
			createdEventSessions,
			files,
		} = await CreateEventService.run({ event, sessions });

		return res.json({
			event: createdEvent,
			sessions: createdEventSessions,
			files,
		});
	}

	/**
	 * Deletes Event given it's id
	 * @param {*} req
	 * @param {*} res
	 */
	async delete(req, res) {
		const { id } = req.params;

		await EventFile.destroy({ where: { eventId: id } });
		await EventSession.destroy({ where: { eventId: id } });
		await Event.destroy({ where: { id } });

		return res.json();
	}

	/**
	 * Updates a Event given it's id
	 * @param {*} req
	 * @param {*} res
	 */
	async update(req, res) {
		const { id } = req.params;
		const { event, sessions } = req.body;

		await EventFile.destroy({ where: { eventId: id } });
		await EventSession.destroy({ where: { eventId: id } });
		await Event.destroy({ where: { id } });

		const {
			createdEvent,
			createdEventSessions,
			files,
		} = await CreateEventService.run({ event, sessions });

		return res.json({
			event: createdEvent,
			sessions: createdEventSessions,
			files,
		});
	}
}

export default new EventController();
