import School from '../models/School';

// Controller for the School routes
class SchoolController {
	// Get all the Schools
	async index(_, res) {
		const schools = await School.findAll({
			where: { active: true },
		});

		return res.json(schools);
	}

	// Creates a Single Schools
	async create(req, res) {
		const school = await School.create({ ...req.body, active: true });

		return res.json(school);
	}

	// Delete a Schools
	async delete(req, res) {
		console.log(req.query);

		//Find from the route id and deletes the object
		await School.destroy({ where: { id: req.params.id } });

		return res.json();
	}

	// Updates a School
	async update(req, res) {
		console.log(req.body);

		//Find from the route id and updates the object
		const school = await School.update(req.body, {
			where: { id: req.params.id },
			returning: true,
			plain: true,
		});

		//1 because of an null
		return res.json(school[1]);
	}
}

export default new SchoolController();
