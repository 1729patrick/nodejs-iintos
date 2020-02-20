import Sequelize, { Model } from 'sequelize';

class ActivityUser extends Model {
	static init(sequelize) {
		return super.init(
			{
				activityId: Sequelize.INTEGER,
				userId: Sequelize.INTEGER,
			},
			{ sequelize }
		);
	}
	static associate(models) {
		this.belongsTo(models.Activity, { foreignKey: 'activityId', as: 'activity' });
		this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
	}
}

export default ActivityUser;
