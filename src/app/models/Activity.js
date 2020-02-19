import Sequelize, { Model } from 'sequelize';

class Activity extends Model {
	static init(sequelize) {
		return super.init(
			{
                title: Sequelize.STRING,
                description: Sequelize.STRING,
			},
			{ sequelize }
        );
        
    }
    static associate(models) {
		this.belongsTo(models.School, { foreignKey: 'projectId', as: 'project' });
	}
}

export default Activity;
