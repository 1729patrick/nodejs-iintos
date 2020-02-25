import Sequelize, { Model } from 'sequelize';

class Result extends Model {
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
		this.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
		this.hasMany(models.ResultFile, {
			foreignKey: 'resultId',
			as: 'resultFile',
		});
	}
}
export default Result;
