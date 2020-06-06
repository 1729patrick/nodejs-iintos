import Sequelize, { Model } from 'sequelize';

class Event extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: Sequelize.STRING,
				description: Sequelize.STRING,
				type: Sequelize.STRING,
				date: Sequelize.DATE,
			},
			{ sequelize }
		);
	}

	static associate(models) {
		this.hasMany(models.EventSession, {
			foreignKey: 'eventId',
			as: 'sessions',
		});
		this.hasMany(models.EventFile, {
			foreignKey: 'eventId',
			as: 'files',
		});
	}
}

export default Event;
