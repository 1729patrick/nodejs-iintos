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
				reasonInactive: Sequelize.STRING,
				active: Sequelize.BOOLEAN,
				isPrivacy: Sequelize.BOOLEAN,
			},
			{
				hooks: {
					beforeCreate: async user => {
						user.passwordHash = await bcrypt.hash(user.password, 8);
					},
					beforeUpdate: async user => {
						if (user.password)
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
		this.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
		this.belongsTo(models.File, {
			foreignKey: 'fileVerificationId',
			as: 'certificate',
		});
		this.belongsTo(models.File, {
			foreignKey: 'avatarId',
			as: 'avatar',
		});
	}
}

export default User;
