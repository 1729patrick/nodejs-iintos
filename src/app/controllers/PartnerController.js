import Queue from '../../lib/Queue';
import JoinRequestProject from '../jobs/JoinRequestProject';
import User from '../models/User';
import SchoolProject from '../models/SchoolProject';
import School from '../models/School';
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
		const schoolProject = await SchoolProject.findAll({
			where: { projectId, active: false },
			include: [
				{
					model: User,
					as: 'coordinator',
					attributes: {
						exclude: ['passwordHash'],
					},
					include: [
						{
							model: Role,
							as: 'role',
						},
					],
				},
				{ model: School, as: 'school' },
			],
			order: [['createdAt', 'DESC']],
		});

		return res.json(
			schoolProject.map(
				({
					id,
					active,
					createdAt,
					updatedAt,
					reasonInactive,
					coordinator,
					school,
				}) => ({
					id,
					active,
					reasonInactive,
					email: coordinator?.email,
					name: coordinator?.name,
					school: school?.name,
					role: coordinator?.role?.name,
					createdAt,
					updatedAt,
				})
			)
		);
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
		const schoolProject = await SchoolProject.findOne({
			where: { projectId, schoolId: req.schoolId },
		});

		return res.json(schoolProject);
	}

	async create(req, res) {
		const projectId = req.params.id;

		const schoolProject = await SchoolProject.create({
			schoolId: req.schoolId,
			userId: req.userId,
			projectId,
			active: false,
		});

		const message = 'New partner request to your project!';

		Queue.add(JoinRequestProject.key, { message, projectId });

		return res.json(schoolProject);
	}

	async delete(req, res) {
		const projectId = req.params.id;
		const schoolProject = await SchoolProject.destroy({
			where: { projectId, schoolId: req.schoolId, userId: req.userId },
		});

		return res.json(schoolProject);
	}

	async update(req, res) {
		const { id } = req.params;

		const schoolProject = await SchoolProject.findOne({
			where: { id },
		});

		const schoolProjectUpdated = await schoolProject.update(req.body);

		return res.json(schoolProjectUpdated);
	}
}

export default new PartnerController();
