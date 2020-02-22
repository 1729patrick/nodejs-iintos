import Sequelize, { Model } from 'sequelize';

class ProjectUser extends Model {
	static init(sequelize) {
		return super.init(
			{
				projectId: Sequelize.INTEGER,
				userId: Sequelize.INTEGER,
				studentName: Sequelize.STRING,
				studentAge: Sequelize.INTEGER,
			},
			{ sequelize }
		);
	}
	static associate(models) {
		this.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
		this.belongsTo(models.User, { foreignKey: 'userId', as: 'professor' });
	}
}

export default ProjectUser;
