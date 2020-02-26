import Sequelize, { Model } from 'sequelize';

class OutputResult extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: Sequelize.STRING,
				description: Sequelize.STRING,
			},
			{ sequelize }
		);
	}

	static associate(models) {
		this.hasMany(models.OutputResultFile, {
			foreignKey: 'outputResultId',
			as: 'outputResultFile',
		});
	}
}
export default OutputResult;
