import School from '../models/School';

/**
 * Controller for the School
 *
 * @class SchoolController
 */
class SchoolController {
	/**
	 * Get all Schools
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 *
	 * @memberof SchoolController
	 */
	async index(req, res) {
		const { active, all = false } = req.query;

		let where = {};
		if (active) {
			where = {
				active,
			};
		}

		if (
			!JSON.parse(all) &&
			(req.role === 'Coordinator' || req.role === 'Teacher')
		) {
			where = { ...where, id: req.schoolId };
		}

		if (req.role === 'IINTOS-Admin' || req.role === 'IINTOS-Partner') {
			return res.json([]);
		}

		const schools = await School.findAll({
			where,
			order: [['createdAt', 'DESC']],
		});

		return res.json(schools);
	}

	/**
	 * Creates a Single Schools
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 *
	 * @memberof SchoolController
	 */
	async create(req, res) {
		const school = await School.create({ active: true, ...req.body });

		return res.json(school);
	}
	/**
	 * Delete a Schools
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 *
	 * @memberof SchoolController
	 */
	async delete(req, res) {
		try {
			// Find from the route id and deletes the object
			await School.destroy({ where: { id: req.params.id } });

			return res.json();
		} catch (e) {
			return res.status(401).json({
				error: 'Remove all relationships before deleting the school',
			});
		}
	}

	/**
	 * Update a school
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 *
	 * @memberof SchoolController
	 */
	async update(req, res) {
		// Get the essential params
		const {
			name,
			phone,
			country,
			city,
			active,
			postalCode,
			contactEmail,
			showContact,
		} = req.body;

		const updatedSchool = {
			name,
			phone,
			country,
			city,
			active,
			postalCode,
			contactEmail,
			showContact,
		};

		// Find from the route id and updates the object
		const school = await School.update(updatedSchool, {
			where: { id: req.params.id },
			returning: true,
			plain: true,
		});

		// 1 because of an null
		return res.json(school[1]);
	}
}

export default new SchoolController();
