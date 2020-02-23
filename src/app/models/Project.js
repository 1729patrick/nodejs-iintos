import Sequelize, { Model } from 'sequelize';

class Project extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: Sequelize.STRING,
				goal: Sequelize.STRING,
				description: Sequelize.STRING,
				links: Sequelize.STRING,
				targetAudience: Sequelize.STRING,
				type: Sequelize.STRING,
				startDate: Sequelize.DATE,
				endDate: Sequelize.DATE,
			},
			{ sequelize }
		);
	}

	static associate(models) {
		this.hasMany(models.SchoolProject, {
			foreignKey: 'projectId',
			as: 'schoolProject',
		});
		this.hasMany(models.ProjectUser, {
			foreignKey: 'projectId',
			as: 'projectUser',
		});
	}
}

export default Project;
