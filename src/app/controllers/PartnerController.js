import { Op } from 'sequelize';
import SchoolProject from '../models/SchoolProject';
import ProjectUser from '../models/ProjectUser';
import User from '../models/User';
import Role from '../models/Role';

/**
 * Controller for the professors
 *
 * @class PartnerController
 */
class PartnerController {
	/**
	 * List professors included in project
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 *
	 * @memberof PartnerController
	 */
	async index(req, res) {
		// const { projectId, destination } = req.query;
		const projectId = req.params.id;

		// const currentUser = await User.findOne({ where: { id: req.userId },  });

		//gets all the users in the project
		const projectUser = await ProjectUser.findAll({
			where: { projectId, userId: { [Op.ne]: null }, active: false },
			include: {
				model: User,
				as: 'partner',
				attributes: {
					exclude: ['passwordHash'],
				},
			},
		});

		return res.json(projectUser);
	}

	/**
	 * List professors included in project
	 *
	 * @param {*} req The request object
	 * @param {*} res The response object
	 *
	 * @memberof PartnerController
	 */
	async status(req, res) {
		const projectId = req.params.id;
		// const currentUser = await User.findOne({ where: { id: req.userId },  });

		//gets all the users in the project
		const projectUser = await ProjectUser.findOne({
			where: { projectId, userId: req.userId, active: false },
			include: {
				model: User,
				as: 'partner',
				attributes: {
					exclude: ['passwordHash'],
				},
			},
		});

		return res.json(projectUser);
	}

	async create(req, res) {
		const projectUser = await ProjectUser.create({
			userId: req.userId,
			projectId: req.params.id,
			active: false,
		});

		return res.json(projectUser);
	}

	async delete(req, res) {
		const projectId = req.params.id;
		const projectUser = await ProjectUser.destroy({
			where: { projectId, userId: req.userId },
		});

		return res.json(projectUser);
	}

	async update(req, res) {
		const { id } = req.params;

		const projectUser = await ProjectUser.findOne({
			where: { id },
		});

		const projectUserUpdated = await projectUser.update(req.body);

		return res.json(projectUserUpdated);
	}
}

export default new PartnerController();
