"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class School extends _sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				name: _sequelize2.default.STRING,
				phone: _sequelize2.default.NUMBER,
				country: _sequelize2.default.STRING,
				city: _sequelize2.default.STRING,
				cep: _sequelize2.default.STRING,
			},
			{ sequelize }
		);
	}
}

exports. default = School;
