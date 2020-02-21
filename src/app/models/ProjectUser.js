import Sequelize, { Model } from 'sequelize';

class ProjectUser extends Model {
	static init(sequelize) {
		return super.init(
			{
				projectId: Sequelize.INTEGER,
				userId: Sequelize.INTEGER,
			},
			{ sequelize }
		);
	}
	static associate(models) {
		this.belongsTo(models.Activity, { foreignKey: 'projectId', as: 'project' });
		this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
	}
}

export default ActivityUser;
