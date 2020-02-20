import SchoolProjects from '../models/SchoolProject';

// Controler for the binding of a school anda project
class SchoolProjectController {
	//Creates a binding between a project and a school
	async create(req, res) {
		const { project, school } = req.body;
	}
}

export default new SchoolProjectController();
