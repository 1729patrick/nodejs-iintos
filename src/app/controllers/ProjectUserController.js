import ProjectUser from '../models/ProjectUser';
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

		const project = await ProjectUser.findAll({
			where: { projectId },
			attributes: ['id', 'userId'],
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['name', 'email'],
				},
			],
		});

		res.json(project);
	}

	

}
