import Sequelize, { Model } from 'sequelize';

class EventSession extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: Sequelize.STRING,
				description: Sequelize.STRING,
				date: Sequelize.DATE,
			},
			{ sequelize }
		);
	}

	static associate(models) {
		this.belongsTo(models.Event, {
			foreignKey: 'eventId',
			as: 'event',
		});
		this.hasMany(models.EventFile, {
			foreignKey: 'eventSessionId',
			as: 'files',
		});
	}
}

export default EventSession;
