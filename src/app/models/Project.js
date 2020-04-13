import Sequelize, { Model } from 'sequelize';

class Project extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: Sequelize.STRING,
				goal: Sequelize.STRING,
				description: Sequelize.STRING,
				links: Sequelize.STRING,
				ageRangeStart: Sequelize.INTEGER,
				ageRangeEnd: Sequelize.INTEGER,
				type: Sequelize.STRING,
				startDate: Sequelize.DATE,
				endDate: Sequelize.DATE,
				campaing: Sequelize.BOOLEAN,
				referenceEmail: Sequelize.STRING,
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
