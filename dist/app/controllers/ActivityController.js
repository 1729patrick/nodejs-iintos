"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Activity = require('../models/Activity'); var _Activity2 = _interopRequireDefault(_Activity);
var _ActivityUser = require('../models/ActivityUser'); var _ActivityUser2 = _interopRequireDefault(_ActivityUser);
var _ProjectUser = require('../models/ProjectUser'); var _ProjectUser2 = _interopRequireDefault(_ProjectUser);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

/**
 * Activity controller
 */
class ActivityController {
	/**
	 * Gets all the activities from a given id
	 *
	 * @param {*} req Request
	 * @param {*} res Response
	 */
	async index(req, res) {
		const projectId = req.params.id;

		const activities = await _Activity2.default.findAll({
			where: { projectId },
			include: [
				{
					model: _ActivityUser2.default,
					as: 'activityUser',
					include: {
						model: _ProjectUser2.default,
						as: 'projectUser',
						include: {
							model: _User2.default,
							as: 'professor',
						},
					},
				},
			],
		});

		const formattedAcitivities = activities.map(
			({ activityUser, id, title, description, startDate, endDate }) => {
				let professors = [],
					students = [];
				activityUser.forEach(({ projectUser, ...user }) => {
					if (!projectUser) return;
					if (projectUser.professor) {
						return professors.push({
							id: projectUser.id,
							name: projectUser.professor.name,
						});
					}

					return students.push({
						id: projectUser.id,
						name: projectUser.studentName,
					});
				});

				return {
					id,
					title,
					description,
					startDate,
					endDate,
					students,
					professors,
					studentsStr: students.map(({ name }) => name).join(', '),
					professorsStr: professors.map(({ name }) => name).join(', '),
				};
			}
		);

		return res.json(formattedAcitivities);
	}
	/**
	 * Creates a new activty in the project
	 *
	 * @param {Requesta parameters} req
	 * @param {*} res
	 */
	async create(req, res) {
		const { students, professors, ...activity } = req.body;
		const creattedActivity = await _Activity2.default.create(activity);

		const users = new Set([
			...students.map(v => +v),
			...professors.map(v => +v),
		]);
		const validUsers = [...users].filter(v => v);
		await Promise.all(
			validUsers.map(projectUserId => {
				return _ActivityUser2.default.create({
					activityId: creattedActivity.id,
					projectUserId,
				});
			})
		);

		return res.json(creattedActivity);
	}

	/**
	 * Deletes a activity given its id
	 * @param {*} req
	 * @param {*} res
	 */
	async delete(req, res) {
		try {
			await _Activity2.default.destroy({ where: { id: req.params.id } });

			return res.json();
		} catch (e) {
			return res.status(401).json({
				error: 'You must remove all participants before removing',
			});
		}
	}

	async update(req, res) {
		const { id } = req.params;
		const { title, description, students, professors } = req.body;

		//Find from the route id and updates the object
		await _Activity2.default.update(
			{ title, description },
			{
				where: { id },
				returning: true,
				plain: true,
				raw: true,
			}
		);

		await _ActivityUser2.default.destroy({ where: { activityId: id } });
		const users = new Set([
			...students.map(v => +v),
			...professors.map(v => +v),
		]);
		const validUsers = [...users].filter(v => v);

		await Promise.all(
			validUsers.map(projectUserId => {
				return _ActivityUser2.default.create({
					activityId: id,
					projectUserId,
				});
			})
		);

		return res.json(req.body);
	}
}

exports. default = new ActivityController();
