import { Op } from 'sequelize';
import ProjectUser from '../models/ProjectUser';
import User from '../models/User';
import Role from '../models/Role';

class ProfessorController {
	async index(req, res) {
		const { projectId } = req.query;

		const projectUser = await ProjectUser.findAll({ where: { projectId } });

		const professorsAlreadyProject = projectUser.map(({ userId }) => userId);

		const role = await Role.findOne({ where: { name: 'Professor' } });
		const users = await User.findAll({
			where: { roleId: role.id, id: { [Op.notIn]: professorsAlreadyProject } },
		});

		return res.json(users);
	}
}

export default new ProfessorController();
