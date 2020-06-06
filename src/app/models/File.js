import Sequelize, { Model } from 'sequelize';

class File extends Model {
	static init(sequelize) {
		return super.init(
			{
				name: Sequelize.STRING,
				path: Sequelize.STRING,
				link: Sequelize.STRING,
				url: {
					type: Sequelize.VIRTUAL,
					get() {
						return `${process.env.APP_URL}/files/${this.path}`;
					},
				},
			},
			{ sequelize }
		);
	}
}

export default File;
