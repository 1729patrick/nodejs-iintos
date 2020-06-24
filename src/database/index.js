import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import sequelizeConfig from '../config/database';

import User from '../app/models/User';
import Activity from '../app/models/Activity';
import ActivityUser from '../app/models/ActivityUser';
import Country from '../app/models/Country';
import File from '../app/models/File';
import Project from '../app/models/Project';
import Result from '../app/models/Result';
import Role from '../app/models/Role';
import School from '../app/models/School';
import SchoolProject from '../app/models/SchoolProject';
import Country from '../app/models/Country';
import Activity from '../app/models/Activity';
import Role from '../app/models/Role';
import ProjectUser from '../app/models/ProjectUser';
import ActivityUser from '../app/models/ActivityUser';
import ResultFile from '../app/models/ResultFile';
import OutputResult from '../app/models/OutputResult';
import ActivityFile from '../app/models/ActivityFile';
import OutputResultFile from '../app/models/OutputResultFile';
import News from '../app/models/News';
import Stem from '../app/models/Stem';
import Log from '../app/models/Log';

import Event from '../app/models/Event';
import EventSession from '../app/models/EventSession';
import EventFile from '../app/models/EventFile';

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
	ResultFile,
	Result,
	OutputResult,
	ActivityFile,
	OutputResultFile,
	News,
	Stem,
	Log,
	Event,
	EventFile,
	EventSession,
];

class Database {
	constructor() {
		this.init();
	}

	init() {
		// this.connection = new Sequelize(sequelizeConfig);

		// models
		// 	.map(model => model.init(this.connection))
		// 	.map(model => model.associate && model.associate(this.connection.models));

		mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useFindAndModify: true,
		});
	}
}

export default new Database();
