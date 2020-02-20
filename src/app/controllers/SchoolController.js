import School from '../models/School';

class SchoolController {
	async index(_, res) {
		const schools = await School.findAll({
			where: { active: true },
		});

		return res.json(schools);
	}

	async create(req, res) {
		const school = await School.create({ ...req.body, active: true });

		return res.json(school);
	}
}

export default new SchoolController();
