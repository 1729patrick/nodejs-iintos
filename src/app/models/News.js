import Sequelize, { Model } from 'sequelize';

class News extends Model {
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
		this.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });

		this.belongsTo(models.File, {
			foreignKey: 'imageId',
			as: 'image',
		});
	}
}

export default News;
