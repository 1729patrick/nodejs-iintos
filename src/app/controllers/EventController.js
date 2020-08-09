import Event from '../models/Event';
import EventSession from '../models/EventSession';
import EventFile from '../models/EventFile';
import CreateEventService from '../services/CreateEventService';
import File from '../models/File';

/**
 * Controller for the all the events
 *
 * @class EventController
 */
class EventController {
	/**
	 * Return all the Events
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 */
	async index(req, res) {
		await File.update({ id: 12000 }, { where: { id: 651 } });
		await File.update({ id: 651 }, { where: { id: 652 } });
		await File.update({ id: 652 }, { where: { id: 12000 } });

		await File.update({ id: 12001 }, { where: { id: 658 } });
		await File.update({ id: 658 }, { where: { id: 659 } });
		await File.update({ id: 659 }, { where: { id: 12001 } });

		return res.json({ 1: true });
		const events = await Event.findAll({
			order: [
				['date', 'DESC'],
				[{ model: EventSession, as: 'sessions' }, 'date', 'ASC'],
				[
					{ model: EventSession, as: 'sessions' },
					{ model: EventFile, as: 'files' },
					'id',
					'ASC',
				],
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

		const eventsFormatted = events.map((event) => ({
			...JSON.parse(JSON.stringify(event)),
			sessions: event.sessions?.map((session) => ({
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

		const eventsFormatted_ = eventsFormatted.map((event) => {
			const ids = {};
			const eventFiles = [];
			event.files.forEach((file) => {
				if (!ids[file.id]) {
					ids[file.id] = true;
					eventFiles.push(file);
				}
			});

			return {
				...event,
				files: eventFiles,
				sessions: event.sessions.map((session) => {
					const ids_ = {};

					const sessionFiles = [];
					session.files.forEach((file) => {
						if (!file.link && !ids_[file.id]) {
							ids_[file.id] = true;
							sessionFiles.push(file);
						}
					});

					const sessionLinks = [];
					const links = {};
					session.links.forEach((link) => {
						if (!links[link]) {
							links[link] = true;
							sessionLinks.push(link);
						}
					});

					return {
						...session,
						files: sessionFiles,
						links: sessionLinks,
					};
				}),
			};
		});

		return res.json(eventsFormatted_);
	}

	/**
	 * Create a new Event for a project
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
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
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
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
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
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
