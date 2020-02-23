"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Role = require('../models/Role'); var _Role2 = _interopRequireDefault(_Role);
class RolesController {
	async index(req, res) {
		const roles = await _Role2.default.findAll();

		return res.json(roles);
	}
}

exports. default = new RolesController();
