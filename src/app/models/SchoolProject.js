import Sequelize, { Model } from 'sequelize';

class SchoolProject extends Model {
	static init(sequelize) {
		return super.init(
			{
				projectId: Sequelize.INTEGER,
				schoolId: Sequelize.INTEGER,
			},
			{ sequelize }
		);
	}
	static associate(models) {
		this.belongsTo(models.School, { foreignKey: 'schoolId', as: 'school' });
		this.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
	}
}

export default SchoolProject;
