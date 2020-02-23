import { Op } from 'sequelize';
import SchoolProject from '../models/SchoolProject';
import ProjectUser from '../models/ProjectUser';
import User from '../models/User';
import Role from '../models/Role';

class ProfessorController {
	async index(req, res) {
		const { projectId } = req.query;

		const schoolProject = await SchoolProject.findAll({
			where: {
				projectId,
			},
		});

		const formattedSchoolProject = schoolProject.map(
			({ schoolId }) => schoolId
		);

		const projectUser = await ProjectUser.findAll({
			where: { projectId, userId: { [Op.ne]: null } },
		});

		const professorsAlreadyProject = projectUser.map(({ userId }) => userId);
		const role = await Role.findOne({ where: { name: 'Professor' } });
		const users = await User.findAll({
			where: {
				roleId: role.id,
				id: { [Op.notIn]: professorsAlreadyProject },
				schoolId: { [Op.in]: formattedSchoolProject },
			},
			attributes: {
				exclude: ['passwordHash'],
			},
		});

		return res.json(users);
	}
}

export default new ProfessorController();
