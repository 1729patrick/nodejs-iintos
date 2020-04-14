import { Op } from 'sequelize';
import SchoolProject from '../models/SchoolProject';
import ProjectUser from '../models/ProjectUser';
import User from '../models/User';
import Role from '../models/Role';

class ProfessorController {
	async index(req, res) {
		const { projectId, destination } = req.query;

		const currentUser = await User.findOne({ where: { id: req.userId } });

		//gets all the users in the project
		const projectUser = await ProjectUser.findAll({
			where: { projectId, userId: { [Op.ne]: null } },
		});

		//removes all the
		const professorsAlreadyProject = projectUser.map(({ userId }) => userId);

		if (destination === 'IINTOS') {
			const users = await User.findAll({
				where: {
					roleId: {
						[Op.or]: [4, 5],
					},
					active: true,
					id: { [Op.notIn]: professorsAlreadyProject },
				},
				attributes: {
					exclude: ['passwordHash'],
				},
			});

			return res.json(users);
		}
		let schoolProject;
		// if it's the admin the school id is null
		// so 
		if (currentUser.schoolId === null) {
			schoolProject = await SchoolProject.findAll({
				where: {
					projectId,
				},
			});
		} else {
			schoolProject = await SchoolProject.findAll({
				where: {
					projectId,
					schoolId: currentUser.schoolId,
				},
			});
		}
		const formattedSchoolProject = schoolProject.map(
			({ schoolId }) => schoolId
		);

		let role = await Role.findAll({
			where: { name: { [Op.in]: ['Professor', 'Coordinator'] } },
		});

		role = role.map(({ id }) => id);

		const users = await User.findAll({
			where: {
				roleId: { [Op.in]: role },
				id: { [Op.notIn]: professorsAlreadyProject },
				schoolId: { [Op.in]: formattedSchoolProject },
				active: true,
			},
			attributes: {
				exclude: ['passwordHash'],
			},
		});

		return res.json(users);
	}
}

export default new ProfessorController();
