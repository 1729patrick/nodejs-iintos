import Sequelize, { Model } from 'sequelize';

class ActivityFile extends Model {
	static init(sequelize) {
		return super.init({}, { sequelize });
	}

	static associate(models) {
		this.belongsTo(models.File, {
			foreignKey: 'fileId',
			as: 'file',
		});
		this.belongsTo(models.Activity, {
			foreignKey: 'activityId',
			as: 'activity',
		});
	}
}

export default ActivityFile;
