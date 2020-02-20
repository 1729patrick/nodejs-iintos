import SchoolProjects from '../models/SchoolProject';
import School from '../models/School';

// Controler for the binding of a school anda project
class SchoolProjectController {
	//Creates a binding between a project and a school
	async create(req, res) {
		const { projectId, schoolId } = req.body;

		const schoolProject = await SchoolProjects.create({ projectId, schoolId });

		return res.json(schoolProject);
	}

	//Get all the school from a projects :id
	async index(req, res) {
		const projectId = req.params.id;

		const project = await SchoolProjects.findAll({
			where: { projectId },
			attributes: ['id', 'schoolId'],
			include: [
				{
					model: School,
					as: 'school',
					attributes: ['name', 'phone', 'country', 'city', 'postalCode'],
				},
			],
		});

		res.json(project);
	}

	// Deletes the bind between a school and a project
	async delete(req, res) {
		const id = req.params.id;

		await SchoolProjects.destroy({ where: { id } });

		return res.json();
	}
}

export default new SchoolProjectController();
