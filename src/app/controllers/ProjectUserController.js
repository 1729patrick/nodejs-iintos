import ProjectUser from '../models/ProjectUser';
import User from '../models/User';
import Role from '../models/Role';
import School from '../models/School';

/**
 *	Controller for the binding of an user and an project
 */
class ProjectUserController {
	/**
	 * Gets all the user in this project
	 * @param {} req
	 * @param {*} res
	 */
	async index(req, res) {
		const projectId = req.params.id;
		const projectUser = await ProjectUser.findAll({
			where: { projectId },
			include: [
				{
					model: School,
					as: 'school',
					attributes: ['name'],
				},
				{
					model: User,
					as: 'professor',
					attributes: { exclude: 'passwordHash' },
					include: [
						{
							model: Role,
							as: 'role',
							attributes: ['name'],
						},
						{
							model: School,
							as: 'school',
							attributes: ['id', 'name'],
						},
					],
				},
			],
		});

		let students = [],
			professors = [];
		projectUser.forEach(user => {
			if (user.professor) {
				return professors.push(user);
			}

			return students.push(user);
		});

		//map the role and school of professor
		professors = professors.map(({ professor }) => {
			const { name, email, active, school = {}, role = {} } = professor;
			return {
				professor: {
					name,
					email,
					active,
					school: school.name,
					role: role.name,
				},
			};
		});
		//map the role and school of student
		students = students.map(student => {
			const { studentName, school = {} } = student;
			console.log(studentName);
			console.log(school);
			return {
				studentName,
				school: school.name,
			};
		});

		res.json({ students, professors });
	}

	async create(req, res) {
		const projectUser = await ProjectUser.create(req.body);

		res.json(projectUser);
	}

	async delete(req, res) {
		const { id } = req.params;
		const projectUser = await ProjectUser.destroy({ where: { id } });

		res.json(projectUser);
	}
}
export default new ProjectUserController();
