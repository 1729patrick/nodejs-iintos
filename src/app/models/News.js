import Sequelize, { Model } from 'sequelize';

class News extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: Sequelize.STRING,
				description: Sequelize.STRING,
				resultId: Sequelize.INTEGER,
				userId: Sequelize.INTEGER,
			},
			{
				sequelize,
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.User, {
			foreignKey: 'userId',
			as: 'author',
		});

		this.belongsTo(models.Result, {
			foreignKey: 'resultId',
			as: 'result',
		});
	}
}

export default News;
