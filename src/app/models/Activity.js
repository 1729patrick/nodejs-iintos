import Sequelize, { Model } from 'sequelize';

class Activity extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: Sequelize.STRING,
				description: Sequelize.STRING,
				done: Sequelize.BOOLEAN,
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
		this.hasMany(models.ActivityFile, {
			foreignKey: 'activityId',
			as: 'activityFile',
		});
	}
}

export default Activity;
