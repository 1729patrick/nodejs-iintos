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

		//get the school list of this project
		let schoolList = await SchoolProjects.findAll({
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
		//map to only get it's ids
		schoolList = schoolList.map(({ schoolId }) => schoolId);

		//================ Send the email ================
		const school = await School.findOne({ where: { id: schoolId } });
		const project = await Project.findOne({ where: { id: projectId } });
		let coordinatorList = await User.findAll({
			attributes: ['email', 'schoolId'],
			where: { roleId: 2, active: true }, // 2 Coordinator because of id in the db
		});

		//Filter out the coordinators that arent in the project
		coordinatorList = coordinatorList.filter(({ schoolId }) => {
			return schoolList.includes(schoolId);
		});
		//map to get only the emails
		coordinatorList = coordinatorList.map(({ email }) => email);

		//get all the professors emails
		const professorsEmails = await ProjectUser.findAll({
			where: { projectId },
			include: [
				{
					model: User,
					as: 'professor',
				},
			],
		});
		//filters out the students
		const professors = [];
		professorsEmails.forEach(user => {
			if (user.professor) {
				return professors.push(user);
			}
		});
		const emailList = professors.map(({ professor }) => professor.email);

		// Send email to every professor about the new activity
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
		//send email to the coordinators
		coordinatorList.forEach(email =>
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
