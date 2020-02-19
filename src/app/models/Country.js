import Sequelize, { Model } from 'sequelize';

class Country extends Model {
	static init(sequelize) {
		return super.init(
			{
                name: Sequelize.STRING,
			},
			{ sequelize }
		);
	}
}

export default Country;
