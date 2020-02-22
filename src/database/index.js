import Sequelize from 'sequelize';

import sequelizeConfig from '../config/database';

import User from '../app/models/User';
import Activity from '../app/models/Activity';
import ActivityUser from '../app/models/ActivityUser';
import Country from '../app/models/Country';
import File from '../app/models/File';
import Project from '../app/models/Project';
import ProjectFile from '../app/models/ProjectFile';
import Result from '../app/models/Result';
import Role from '../app/models/Role';
import School from '../app/models/School';
import SchoolProject from '../app/models/SchoolProject';
import Country from '../app/models/Country';
import Activity from '../app/models/Activity';
import Role from '../app/models/Role';
import ProjectUser from '../app/models/ProjectUser';
import ActivityUser from '../app/models/ActivityUser';

const models = [
	User,
	School,
	File,
	Project,
	SchoolProject,
	ProjectUser,
	Country,
	Activity,
	Role,
	ActivityUser,
	ProjectFile,
	Result,
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
