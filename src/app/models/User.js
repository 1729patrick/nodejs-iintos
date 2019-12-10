import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
	static init(sequelize) {
		return super.init(
			{
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				password: Sequelize.VIRTUAL,
				passwordHash: Sequelize.STRING,
				cordinator: Sequelize.BOOLEAN,
				active: Sequelize.BOOLEAN,
			},
			{
				hooks: {
					beforeCreate: async user => {
						user.passwordHash = await bcrypt.hash(user.password, 8);
					},
				},
				sequelize,
			}
		);
	}

	checkPassword(password) {
		return bcrypt.compare(password, this.passwordHash);
	}

	static associate(models) {
		this.belongsTo(models.School, { foreignKey: 'schoolId', as: 'school' });
		this.belongsTo(models.File, {
			foreignKey: 'cordinatorVerification',
		});
	}
}

export default User;
