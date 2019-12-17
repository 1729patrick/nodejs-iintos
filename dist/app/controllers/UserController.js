"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _CreateUserService = require('../services/CreateUserService'); var _CreateUserService2 = _interopRequireDefault(_CreateUserService);

class UserController {
	async store(req, res) {
		const { user, school } = req.body;

		const userCreated = await _CreateUserService2.default.run({ user, school });

		return res.json(userCreated);
	}
}

exports. default = new UserController();
