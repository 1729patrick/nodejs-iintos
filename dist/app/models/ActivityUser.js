"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class ActivityUser extends _sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				activityId: _sequelize2.default.INTEGER,
				projectUserId: _sequelize2.default.INTEGER,
			},
			{ sequelize }
		);
	}
	static associate(models) {
		this.belongsTo(models.Activity, { foreignKey: 'activityId', as: 'activity' });
		this.belongsTo(models.ProjectUser, { foreignKey: 'projectUserId', as: 'projectUser' });
	}
}

exports. default = ActivityUser;
