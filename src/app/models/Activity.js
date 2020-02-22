import Sequelize, { Model } from 'sequelize';

class Activity extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: Sequelize.STRING,
				description: Sequelize.STRING,
				startDate: Sequelize.DATE,
				endDate: Sequelize.DATE,
			},
			{ sequelize }
		);
	}
	static associate(models) {
		this.belongsTo(models.School, { foreignKey: 'projectId', as: 'project' });
		this.hasMany(models.ActivityUser, {
			foreignKey: 'activityId',
			as: 'activityUser',
		});
	}
}

export default Activity;
