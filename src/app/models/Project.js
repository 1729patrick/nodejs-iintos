import Sequelize, { Model } from 'sequelize';

class Project extends Model {
	static init(sequelize) {
		return super.init(
			{
                goal: Sequelize.STRING,
                description: Sequelize.STRING,
                links: sequelize.STRING,
                targetAudience: sequelize.STRING,
                type: sequelize.STRING
			},
			{ sequelize }
		);
	}
}

export default Project;
