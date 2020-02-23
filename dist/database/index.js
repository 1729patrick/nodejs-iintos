"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _Activity = require('../app/models/Activity'); var _Activity2 = _interopRequireDefault(_Activity);
var _ActivityUser = require('../app/models/ActivityUser'); var _ActivityUser2 = _interopRequireDefault(_ActivityUser);
var _Country = require('../app/models/Country'); var _Country2 = _interopRequireDefault(_Country);
var _File = require('../app/models/File'); var _File2 = _interopRequireDefault(_File);
var _Project = require('../app/models/Project'); var _Project2 = _interopRequireDefault(_Project);
var _Result = require('../app/models/Result'); var _Result2 = _interopRequireDefault(_Result);
var _Role = require('../app/models/Role'); var _Role2 = _interopRequireDefault(_Role);
var _School = require('../app/models/School'); var _School2 = _interopRequireDefault(_School);
var _SchoolProject = require('../app/models/SchoolProject'); var _SchoolProject2 = _interopRequireDefault(_SchoolProject);



var _ProjectUser = require('../app/models/ProjectUser'); var _ProjectUser2 = _interopRequireDefault(_ProjectUser);

var _ResultFile = require('../app/models/ResultFile'); var _ResultFile2 = _interopRequireDefault(_ResultFile);

const models = [
	_User2.default,
	_School2.default,
	_File2.default,
	_Project2.default,
	_SchoolProject2.default,
	_ProjectUser2.default,
	_Country2.default,
	_Activity2.default,
	_Role2.default,
	_ActivityUser2.default,
	_ResultFile2.default,
	_Result2.default,
];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new (0, _sequelize2.default)(_database2.default);

		models
			.map(model => model.init(this.connection))
			.map(model => model.associate && model.associate(this.connection.models));
	}
}

exports. default = new Database();
