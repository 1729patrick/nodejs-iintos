"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _School = require('../models/School'); var _School2 = _interopRequireDefault(_School);
var _Role = require('../models/Role'); var _Role2 = _interopRequireDefault(_Role);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);

class SessionController {
	async create(req, res) {
		const { email, password } = req.body;

		const user = await _User2.default.findOne({
			where: { email },
			include: [
				{
					model: _School2.default,
					as: 'school',
					attributes: ['name', 'phone', 'country', 'city', 'postalCode'],
				},
				{
					model: _Role2.default,
					as: 'role',
					attributes: ['name'],
				},
				{
					model: _File2.default,
					as: 'certificate',
				},
			],
		});

		if (!user) {
			return res.status(401).json({ error: 'User not found' });
		}

		if (!(await user.checkPassword(password))) {
			return res.status(401).json({ error: "Password don't match" });
		}

		const { id, name, role, active, school, certificate } = user;

		const token = _jsonwebtoken2.default.sign(
			{ userId: id, role: role.name, active },
			_auth2.default.secret,
			{
				expiresIn: _auth2.default.expiresIn,
			}
		);

		return res.json({
			user: {
				name,
				email,
				active,
				certificate: certificate ? certificate.url : null,
				role: role.name,
			},
			school,
			token,
		});
	}
}

exports. default = new SessionController();
