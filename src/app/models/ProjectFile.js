import Sequelize, { Model } from 'sequelize';

class ProjectFile extends Model {
	static init(sequelize) {
		return super.init(
			{
				projectId: Sequelize.INTEGER,
				fileId: Sequelize.INTEGER,
			},
			{ sequelize }
		);
	}
	static associate(models) {
		this.belongsTo(models.Activity, { foreignKey: 'projectId', as: 'project' });
		this.belongsTo(models.User, { foreignKey: 'fileId', as: 'file' });
	}
}

export default ProjectFile;
