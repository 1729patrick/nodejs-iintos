"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Project extends _sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				title: _sequelize2.default.STRING,
				goal: _sequelize2.default.STRING,
				description: _sequelize2.default.STRING,
				links: _sequelize2.default.STRING,
				targetAudience: _sequelize2.default.STRING,
				type: _sequelize2.default.STRING,
				startDate: _sequelize2.default.DATE,
				endDate: _sequelize2.default.DATE
			},
			{ sequelize }
		);
	}
}

exports. default = Project;
