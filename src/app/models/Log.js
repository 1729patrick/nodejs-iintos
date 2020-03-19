import Sequelize, { Model } from 'sequelize';

class Log extends Model {
	static init(sequelize) {
		//method, path, body, params, userId
		return super.init(
			{
				method: Sequelize.STRING,
				path: Sequelize.STRING, //url
				body: Sequelize.STRING,
				params: Sequelize.STRING,
				userId: Sequelize.STRING,
			},
			{ sequelize }
		);
	}
	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
	}
}

export default Log;
