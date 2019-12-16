"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SchoolController = require('./app/controllers/SchoolController'); var _SchoolController2 = _interopRequireDefault(_SchoolController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);

const router = _express.Router.call(void 0, );
const upload = _multer2.default.call(void 0, _multer4.default);

router.post('/users', _UserController2.default.store);
router.get('/schools', _SchoolController2.default.index);

router.post('/sessions', _SessionController2.default.store);

router.post('/files', upload.single('file'), _FileController2.default.store);

exports. default = router;
