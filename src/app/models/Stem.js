import Sequelize, { Model } from 'sequelize';

class Stem extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: Sequelize.STRING,
				link: Sequelize.STRING,
			},
			{ sequelize }
		);
	}
}

export default Stem;
