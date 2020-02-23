"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class ResultFile extends _sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				resultId: _sequelize2.default.INTEGER,
				fileId: _sequelize2.default.INTEGER,
			},
			{ sequelize }
		);
	}
	static associate(models) {
		this.belongsTo(models.Result, { foreignKey: 'resultId', as: 'result' });
		this.belongsTo(models.File, { foreignKey: 'fileId', as: 'file' });
	}
}

exports. default = ResultFile;
