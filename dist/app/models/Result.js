"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Result extends _sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				title: _sequelize2.default.STRING,
				description: _sequelize2.default.STRING
			},
			{ sequelize }
		);
	}
	static associate(models) {
		this.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
	}
}
exports. default = Result;
