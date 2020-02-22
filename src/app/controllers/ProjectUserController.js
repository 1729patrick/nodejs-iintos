import ProjectUser from '../models/ProjectUser';
import User from '../models/User';

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
					model: User,
					as: 'professor',
					attributes: { exclude: 'passwordHash' },
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
