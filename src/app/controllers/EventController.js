import Event from '../models/Event';
import EventProgram from '../models/EventProgram';
import EventReport from '../models/EventReport';
import EventSession from '../models/EventSession';
import EventVideo from '../models/EventVideo';

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
		const results = await Event.findAll({
			include: [
				{ model: EventProgram, as: 'program' },
				{ model: EventReport, as: 'report' },
				{ model: EventSession, as: 'session' },
			],
		});
		return res.json(results);
	}

	/**
	 * Create a new Event for a project
	 * @param {*} req
	 * @param {*} res
	 */
	async create(req, res) {
		const event = req.body;
		const createdEvent = await Event.create(event);

		return res.json(createdEvent);
	}

	/**
	 * Deletes Event given it's id
	 * @param {*} req
	 * @param {*} res
	 */
	async delete(req, res) {
		const { id } = req.params;

		await Event.destroy({ where: { id } });

		return res.json();
	}

	/**
	 * Updates a Event given it's id
	 * @param {*} req
	 * @param {*} res
	 */
	async update(req, res) {
		// get from the body the consts
		const { title, description, shortDescription, type } = req.body;
		const { id } = req.params;

		// create a object
		const updatedEvent = {
			title,
			description,
			shortDescription,
			type,
		};

		// Find from the route id and updates the object
		const createdResult = await Event.update(updatedEvent, {
			where: { id },
			returning: true,
			plain: true,
		});

		// 1 because of an random null
		return res.json(createdResult[1]);
	}
}

export default new EventController();
