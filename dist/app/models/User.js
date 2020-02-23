"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class User extends _sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				name: _sequelize2.default.STRING,
				email: _sequelize2.default.STRING,
				password: _sequelize2.default.VIRTUAL,
				passwordHash: _sequelize2.default.STRING,
				reasonInactive: _sequelize2.default.STRING,
				active: _sequelize2.default.BOOLEAN,
			},
			{
				hooks: {
					beforeCreate: async user => {
						user.passwordHash = await _bcryptjs2.default.hash(user.password, 8);
					},
				},
				sequelize,
			}
		);
	}

	checkPassword(password) {
		return _bcryptjs2.default.compare(password, this.passwordHash);
	}

	static associate(models) {
		this.belongsTo(models.School, { foreignKey: 'schoolId', as: 'school' });
		this.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
		this.belongsTo(models.File, {
			foreignKey: 'fileVerificationId',
			as: 'certificate',
		});
	}
}

exports. default = User;
