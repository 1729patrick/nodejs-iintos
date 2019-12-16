import School from '../models/School';

class SchoolController {
	async index(_, res) {
		const schools = await School.findAll({
			attributes: ['id', 'name'],
			where: { active: true },
		});

		return res.json({ schools });
	}
}

export default new SchoolController();
