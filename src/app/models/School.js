import Sequelize, { Model } from 'sequelize';

class School extends Model {
	static init(sequelize) {
		return super.init(
			{
				name: Sequelize.STRING,
				phone: Sequelize.NUMBER,
				country: Sequelize.STRING,
				city: Sequelize.STRING,
				cep: Sequelize.STRING,
			},
			{ sequelize }
		);
	}
}

export default School;
