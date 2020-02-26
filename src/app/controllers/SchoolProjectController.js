import SchoolProjects from '../models/SchoolProject';
import School from '../models/School';
import Project from '../models/Project';
import ProjectUser from '../models/ProjectUser';
import User from '../models/User';

import Queue from '../../lib/Queue';
import NewSchoolInProjectEmail from '../jobs/NewSchoolInProjectEmail';

// Controler for the binding of a school anda project
class SchoolProjectController {
	//Creates a binding between a project and a school
	async create(req, res) {
		const { projectId, schoolId } = req.body;

		const schoolProject = await SchoolProjects.create({ projectId, schoolId });

		//================ Send the email ================
		const school = await School.findOne({ where: { id: schoolId } });
		const project = await Project.findOne({ where: { id: projectId } });

		console.log('project');
		console.log(project);
		const professorsEmails = await ProjectUser.findAll({
			where: { projectId },
			include: [
				{
					model: User,
					as: 'professor',
				},
			],
		});
		const professors = [];
		professorsEmails.forEach(user => {
			if (user.professor) {
				return professors.push(user);
			}
		});
		const emailList = professors.map(({ professor }) => professor.email);

		// Send email to every professor about the new activity
		console.log('EMAILS');
		console.log(emailList);
		console.log(project.title);
		console.log(school.name);
		emailList.forEach(email =>
			Queue.add(NewSchoolInProjectEmail.key, {
				newProjectSchool: {
					school: school.name,
					project: project.title,
					projectId: projectId,
				},
				receiver: { email: email },
			})
		);

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
