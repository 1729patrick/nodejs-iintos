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
		console.log(projectId);

		const project = await ProjectUser.findAll();

		res.json(project);
	}
}
export default new ProjectUserController();
