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
			},
			{ sequelize }
		);
	}
}

export default Project;
