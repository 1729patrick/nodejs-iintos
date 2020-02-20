import Sequelize, { Model } from 'sequelize';

class School extends Model {
	static init(sequelize) {
		return super.init(
			{
				name: Sequelize.STRING,
				phone: Sequelize.STRING,
				country: Sequelize.STRING,
				active: Sequelize.BOOLEAN,
				city: Sequelize.STRING,
				postalCode: Sequelize.STRING,
			},
			{ sequelize }
		);
	}
}

export default School;
