"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class ProjectUser extends _sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				projectId: _sequelize2.default.INTEGER,
				userId: _sequelize2.default.INTEGER,
				studentName: _sequelize2.default.STRING,
				studentAge: _sequelize2.default.INTEGER,
			},
			{ sequelize }
		);
	}
	static associate(models) {
		this.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
		this.belongsTo(models.User, { foreignKey: 'userId', as: 'professor' });
	}
}

exports. default = ProjectUser;
