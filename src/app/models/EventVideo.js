import Sequelize, { Model } from 'sequelize';

class EventVideo extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: Sequelize.STRING,
				description: Sequelize.STRING,
				url: Sequelize.STRING,
			},
			{ sequelize }
		);
	}
}

export default EventVideo;
