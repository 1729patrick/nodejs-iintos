"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth); // Need to be autentication
var _admin = require('./app/middlewares/admin'); var _admin2 = _interopRequireDefault(_admin); // Need to be Admin Autentication

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SchoolController = require('./app/controllers/SchoolController'); var _SchoolController2 = _interopRequireDefault(_SchoolController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _ProjectController = require('./app/controllers/ProjectController'); var _ProjectController2 = _interopRequireDefault(_ProjectController);
var _RolesController = require('./app/controllers/RolesController'); var _RolesController2 = _interopRequireDefault(_RolesController);
var _SchoolProjectController = require('./app/controllers/SchoolProjectController'); var _SchoolProjectController2 = _interopRequireDefault(_SchoolProjectController);
var _ActivityController = require('./app/controllers/ActivityController'); var _ActivityController2 = _interopRequireDefault(_ActivityController);
var _ProjectUserController = require('./app/controllers/ProjectUserController'); var _ProjectUserController2 = _interopRequireDefault(_ProjectUserController);
var _ProfessorController = require('./app/controllers/ProfessorController'); var _ProfessorController2 = _interopRequireDefault(_ProfessorController);
var _ResultController = require('./app/controllers/ResultController'); var _ResultController2 = _interopRequireDefault(_ResultController);
var _ResultFileController = require('./app/controllers/ResultFileController'); var _ResultFileController2 = _interopRequireDefault(_ResultFileController);

const router = _express.Router.call(void 0, );
const upload = _multer2.default.call(void 0, _multer4.default);

router.post('/sessions', _SessionController2.default.create);
router.post('/signup', _UserController2.default.create);
router.post('/files', upload.single('file'), _FileController2.default.create);
router.get('/schools', _SchoolController2.default.index);

//----- After this point, the user needs autentication -----
router.use(_auth2.default);

//User area
router.post('/users', _admin2.default, _UserController2.default.create);
router.get('/users', _UserController2.default.index);
router.put('/users/:id', _admin2.default, _UserController2.default.update);
router.delete('/users/:id', _admin2.default, _UserController2.default.delete);

// School area
router.post('/schools', _admin2.default, _SchoolController2.default.create);
router.delete('/schools/:id', _admin2.default, _SchoolController2.default.delete);
router.put('/schools/:id', _admin2.default, _SchoolController2.default.update);

//Autentication area

//Project area
router.get('/projects', _ProjectController2.default.index);
router.get('/projects/:id', _ProjectController2.default.findOne);
router.post('/projects', _ProjectController2.default.create);
router.delete('/projects/:id', _ProjectController2.default.delete);
router.put('/projects/:id', _ProjectController2.default.update);

//ProjectUser area
router.get('/projects/:id/users', _ProjectUserController2.default.index);
router.post('/projectUser', _ProjectUserController2.default.create);
router.delete('/projectUser/:id', _ProjectUserController2.default.delete);

//Result area
router.get('/projects/:id/results', _ResultController2.default.index);
router.post('/results', _ResultController2.default.create);
router.delete('/results/:id', _ResultController2.default.delete);
router.put('/results/:id', _ResultController2.default.update);

//Result File area
router.get('/result/:id/files', _ResultFileController2.default.index);

//Activity Area
router.get('/projects/:id/activities', _ActivityController2.default.index);
router.post('/activities', _ActivityController2.default.create);
router.delete('/activities/:id', _ActivityController2.default.delete);
router.put('/activities/:id', _ActivityController2.default.update);

//Roles Area
router.get('/roles', _auth2.default, _RolesController2.default.index);

router.get('/professors', _ProfessorController2.default.index);

//SchoolProject area
router.post('/schoolProjects', _SchoolProjectController2.default.create);
router.get('/projects/:id/schools', _SchoolProjectController2.default.index);
router.delete('/schoolProjects/:id', _SchoolProjectController2.default.delete);

exports. default = router;
