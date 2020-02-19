import Sequelize from 'sequelize';

import sequelizeConfig from '../config/database';

import User from '../app/models/User';
import School from '../app/models/School';
import File from '../app/models/File';
import Project from '../app/models/Project';
import SchoolProject from '../app/models/SchoolProject';
import Country from '../app/models/Country';
import Activity from '../app/models/Activity';
import Student from '../app/models/Student';
import Role from '../app/models/Role';

const models = [
	User,
	School,
	File,
	Project,
	SchoolProject,
	Country,
	Activity,
	Student,
	Role,
];

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
