import ProjectUser from '../models/ProjectUser';
import User from '../models/User';
import Role from '../models/Role';
import School from '../models/School';

/**
 * Controller for the binding of an user and an project
 *
 * @class ProjectUserController
 */
class ProjectUserController {
	/**
	 * Gets all the user in this project
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
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
			order: [['createdAt', 'DESC']],
		});

		//map the role and school of professor
		const projectUserFormatted = projectUser.map(
			({ id, coordinator, professor }) => {
				const { name, email, active, school = {}, role = {} } = professor;
				return {
					id,
					name,
					email,
					active,
					coordinator,
					school: school ? school?.name : '',
					role: role?.name,
				};
			}
		);

		res.json(projectUserFormatted);
	}

	/**
	 * Create a project participant
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 */
	async create(req, res) {
		const projectUser = await ProjectUser.create(req.body);

		res.json(projectUser);
	}

	/**
	 * Delete a project participant
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 */
	async delete(req, res) {
		const { id } = req.params;
		const projectUser = await ProjectUser.destroy({ where: { id } });

		res.json(projectUser);
	}

	/**
	 * Check if user can edit the project participant
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 */
	async canEdit(req, res) {
		const { projectId } = req.params;

		const projectUser = await ProjectUser.findOne({
			where: { projectId, userId: req.userId },
		});

		res.json({ canEdit: projectUser?.coordinator });
	}
}
export default new ProjectUserController();
