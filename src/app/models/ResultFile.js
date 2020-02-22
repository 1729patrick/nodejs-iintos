import Sequelize, { Model } from 'sequelize';

class ResultFile extends Model {
	static init(sequelize) {
		return super.init(
			{
				resultId: Sequelize.INTEGER,
				fileId: Sequelize.INTEGER,
			},
			{ sequelize }
		);
	}
	static associate(models) {
		this.belongsTo(models.Result, { foreignKey: 'resultId', as: 'result' });
		this.belongsTo(models.File, { foreignKey: 'fileId', as: 'file' });
	}
}

export default ResultFile;
