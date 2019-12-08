import Sequelize from 'sequelize';

import sequelizeConfig from '../config/database';

import User from '../app/models/User';
import School from '../app/models/School';
import File from '../app/models/File';

const models = [User, School, File];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(sequelizeConfig);

		models
			.map(model => model.init(this.connection))
			.map(model => model.associate && model.associate(this.connection.models));
	}
}

export default new Database();
