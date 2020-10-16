import Sequelize, { Model } from 'sequelize';

class SchoolProject extends Model {
	static init(sequelize) {
		return super.init(
			{
				projectId: Sequelize.INTEGER,
				schoolId: Sequelize.INTEGER,
				active: Sequelize.BOOLEAN,
				reasonInactive: Sequelize.STRING,
				userId: Sequelize.INTEGER,
			},
			{ sequelize }
		);
	}
	static associate(models) {
		this.belongsTo(models.School, { foreignKey: 'schoolId', as: 'school' });
		this.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
		this.belongsTo(models.User, { foreignKey: 'userId', as: 'coordinator' });
	}
}

export default SchoolProject;
