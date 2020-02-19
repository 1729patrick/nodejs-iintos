import Sequelize, { Model } from 'sequelize';

class Role extends Model {
	static init(sequelize) {
		return super.init(
			{
				name: Sequelize.STRING,
			},
			{ sequelize }
		);
	}
}

export default Role;
