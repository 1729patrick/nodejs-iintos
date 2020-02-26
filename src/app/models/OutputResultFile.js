import Sequelize, { Model } from 'sequelize';

class OutputResultFile extends Model {
	static init(sequelize) {
		return super.init({}, { sequelize });
	}
	static associate(models) {
		this.belongsTo(models.File, {
			foreignKey: 'fileId',
			as: 'file',
		});
		this.belongsTo(models.OutputResult, {
			foreignKey: 'outputResultId',
			as: 'outputResult',
		});
	}
}

export default OutputResultFile;
