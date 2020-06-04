import Sequelize, { Model } from 'sequelize';
import EventVideo from './EventVideo';

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
			as: 'session',
		});
		this.hasMany(models.EventProgram, {
			foreignKey: 'eventId',
			as: 'program',
		});

		this.hasMany(models.EventReport, {
			foreignKey: 'eventId',
			as: 'report',
		});
		/*
		this.hasMany(models.EventVideo, {
			foreignKey: 'eventId',
			as: 'video',
		}); 
		*/
	}
}

export default Event;
