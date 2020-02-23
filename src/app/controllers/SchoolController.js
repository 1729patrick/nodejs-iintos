import School from '../models/School';

// Controller for the School routes
class SchoolController {
	// Get all the Schools
	async index(req, res) {
		const { active } = req.query;

		let where = {};
		if (active) {
			where = {
				where: {
					active,
				},
			};
		}

		if (req.role === 'Coordinator' || req.role === 'Professor') {
			where = { where: { ...where.where, id: req.schoolId } };
		}

		const schools = await School.findAll(where);

		return res.json(schools);
	}

	// Creates a Single Schools
	async create(req, res) {
		const school = await School.create({ ...req.body, active: true });

		return res.json(school);
	}

	// Delete a Schools
	async delete(req, res) {
		//Find from the route id and deletes the object
		await School.destroy({ where: { id: req.params.id } });

		return res.json();
	}

	// Updates a School
	async update(req, res) {
		//Get the essential params
		const { name, phone, country, city, active, postalCode } = req.body;

		const updatedSchool = { name, phone, country, city, active, postalCode };

		//Find from the route id and updates the object
		const school = await School.update(updatedSchool, {
			where: { id: req.params.id },
			returning: true,
			plain: true,
		});

		//1 because of an null
		return res.json(school[1]);
	}
}

export default new SchoolController();
