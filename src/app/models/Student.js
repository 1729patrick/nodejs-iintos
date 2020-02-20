import Sequelize, { Model } from 'sequelize';

class Student extends Model {
	static init(sequelize) {
		return super.init(
			{
				name: Sequelize.STRING,
				age: Sequelize.INTEGER,
			},
			{ sequelize }
		);
	}
	static associate(models) {
		this.belongsTo(models.School, { foreignKey: 'projectId', as: 'project' });
	}
}

export default Student;
