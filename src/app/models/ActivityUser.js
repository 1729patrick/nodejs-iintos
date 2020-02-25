import Sequelize, { Model } from 'sequelize';

class ActivityUser extends Model {
	static init(sequelize) {
		return super.init(
			{
				activityId: Sequelize.INTEGER,
				projectUserId: Sequelize.INTEGER,
				googleEventId: Sequelize.STRING,
			},
			{ sequelize }
		);
	}
	static associate(models) {
		this.belongsTo(models.Activity, {
			foreignKey: 'activityId',
			as: 'activity',
		});
		this.belongsTo(models.ProjectUser, {
			foreignKey: 'projectUserId',
			as: 'projectUser',
		});
	}
}

export default ActivityUser;
