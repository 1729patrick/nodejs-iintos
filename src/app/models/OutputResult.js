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
	/*
	static associate(models) {
		this.belongsTo(models.File, {
			foreignKey: 'fileVerificationId',
			as: 'output',
		});
	}
	*/
}
export default OutputResult;
