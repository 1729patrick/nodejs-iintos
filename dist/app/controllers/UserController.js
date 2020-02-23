"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _CreateUserService = require('../services/CreateUserService'); var _CreateUserService2 = _interopRequireDefault(_CreateUserService);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Role = require('../models/Role'); var _Role2 = _interopRequireDefault(_Role);
var _School = require('../models/School'); var _School2 = _interopRequireDefault(_School);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

// Controller of all users, includes the cruds
class UserController {
	// Get, Returns all the users in database
	async index(req, res) {
		const { role } = req.query;

		let findedRole = {},
			where = {};

		if (role) {
			findedRole = await _Role2.default.findOne({ where: { name: role } });

			if (findedRole) where = { where: { roleId: findedRole.id } };
		}

		const users = await _User2.default.findAll({
			...where,
			attributes: {
				exclude: ['passwordHash'],
			},
			include: [
				{
					model: _Role2.default,
					as: 'role',
					attributes: ['name'],
				},
				{
					model: _School2.default,
					as: 'school',
					attributes: ['name'],
				},
				{
					model: _File2.default,
					as: 'certificate',
				},
			],
			raw: true,
			nest: true,
		});

		return res.json(
			users.map(user => ({
				...user,
				certificate: user.certificate.path
					? `${process.env.APP_URL}/files/${user.certificate.path}`
					: null,
				role: user.role.name,
				school: user.school ? user.school.name : null,
			}))
		);
	}

	// Post, creates a single user
	async create(req, res) {
		const { user, school } = req.body;

		const userCreated = await _CreateUserService2.default.run({
			user,
			school,
			role: req.role,
		});

		return res.json(userCreated);
	}

	// Delete a user
	async delete(req, res) {
		//Find from the route id and deletes the object
		await _User2.default.destroy({ where: { id: req.params.id } });

		return res.json();
	}

	// Updates a user
	async update(req, res) {
		const { id } = req.params;
		const user = req.body;

		//Find from the route id and updates the object
		const updatedUser = await _User2.default.update(user, {
			where: { id },
			returning: true,
			plain: true,
			raw: true,
		});

		const school = await _School2.default.findByPk(user.schoolId);

		if (school && school.active !== user.active) {
			await school.update({ ...school, active: user.active });
		}

		const { passwordHash, ...restUser } = updatedUser[1];
		//1 because of an null
		return res.json(restUser);
	}
}

exports. default = new UserController();
