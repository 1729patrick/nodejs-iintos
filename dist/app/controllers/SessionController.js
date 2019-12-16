"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _School = require('../models/School'); var _School2 = _interopRequireDefault(_School);

var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);

class SessionController {
	async store(req, res) {
		const { email, password } = req.body;

		const user = await _User2.default.findOne({
			where: { email },
			include: [
				{
					model: _School2.default,
					as: 'school',
					attributes: ['name', 'phone', 'country', 'city', 'cep'],
				},
			],
		});

		if (!user) {
			return res.status(401).json({ error: 'User not found' });
		}

		if (!(await user.checkPassword(password))) {
			return res.status(401).json({ error: "Password don't match" });
		}

		const {
			id,
			name,
			cordinator,
			active,
			school,
			cordinatorVerification,
		} = user;

		const token = _jsonwebtoken2.default.sign(
			{ userId: id, cordinator, active },
			_auth2.default.secret,
			{
				expiresIn: _auth2.default.expiresIn,
			}
		);

		return res.json({
			user: { name, email, cordinator, active, cordinatorVerification },
			school,
			token,
		});
	}
}

exports. default = new SessionController();
