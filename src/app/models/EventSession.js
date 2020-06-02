import Sequelize, { Model } from 'sequelize';

class EventSession extends Model {
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
		this.belongsTo(models.Event, {
			foreignKey: 'eventId',
			as: 'event',
		});
	}
}

export default EventSession;
