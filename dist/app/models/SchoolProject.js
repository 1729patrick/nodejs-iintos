"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class SchoolProject extends _sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				projectId: _sequelize2.default.INTEGER,
				schoolId: _sequelize2.default.INTEGER,
			},
			{ sequelize }
		);
	}
	static associate(models) {
		this.belongsTo(models.School, { foreignKey: 'schoolId', as: 'school' });
		this.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
	}
}

exports. default = SchoolProject;
