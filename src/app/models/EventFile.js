import { Model } from 'sequelize';

class EventFile extends Model {
	static init(sequelize) {
		return super.init({}, { sequelize });
	}

	static associate(models) {
		this.belongsTo(models.Event, {
			foreignKey: 'eventId',
			as: 'event',
		});
		this.belongsTo(models.EventSession, {
			foreignKey: 'eventSessionId',
			as: 'eventSession',
		});
		this.belongsTo(models.File, {
			foreignKey: 'fileId',
			as: 'file',
		});
	}
}

export default EventFile;
