import Sequelize, { Model } from 'sequelize';

class ProjectUser extends Model {
	static init(sequelize) {
		return super.init(
			{
				projectId: Sequelize.INTEGER,
				userId: Sequelize.INTEGER,
				studentName: Sequelize.STRING,
				schoolId: Sequelize.INTEGER,
				coordinator: Sequelize.BOOLEAN,
			},
			{ sequelize }
		);
	}

	static associate(models) {
		this.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
		this.belongsTo(models.User, { foreignKey: 'userId', as: 'professor' });
		this.belongsTo(models.School, { foreignKey: 'schoolId', as: 'school' });
	}
}

export default ProjectUser;
