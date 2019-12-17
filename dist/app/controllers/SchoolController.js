"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _School = require('../models/School'); var _School2 = _interopRequireDefault(_School);

class SchoolController {
	async index(_, res) {
		const schools = await _School2.default.findAll({ attributes: ['id', 'name'] });

		return res.json({ schools });
	}
}

exports. default = new SchoolController();
