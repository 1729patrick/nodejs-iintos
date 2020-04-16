import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth'; // Need to be autentication
import adminMiddleware from './app/middlewares/admin'; // Need to be Admin Autentication
import publicMiddleware from './app/middlewares/public';
import loggerMiddleware from './app/middlewares/logger';

import UserController from './app/controllers/UserController';
import SchoolController from './app/controllers/SchoolController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProjectController from './app/controllers/ProjectController';
import RolesController from './app/controllers/RolesController';
import SchoolProjectController from './app/controllers/SchoolProjectController';
import ActivityController from './app/controllers/ActivityController';
import ProjectUser from './app/controllers/ProjectUserController';
import ProfessorController from './app/controllers/ProfessorController';
import ResultController from './app/controllers/ResultController';
import OutputResultController from './app/controllers/OutputResultController';
import HelpController from './app/controllers/HelpController';
import NewsController from './app/controllers/NewsController';
import StemController from './app/controllers/StemController';
import LoggerController from './app/controllers/LoggerController';
import EmailController from './app/controllers/EmailController';

const router = Router();
const upload = multer(multerConfig);

router.use(publicMiddleware);

router.post('/signup', UserController.create); //create user
router.post('/sessions', SessionController.create); //Log in
router.post('/users', authMiddleware, UserController.create); //User created by the admin

//Middleware to record the logs

router.use(loggerMiddleware);

router.post('/files', upload.single('file'), FileController.create);
router.get('/schools', SchoolController.index);

router.get('/outputResults', OutputResultController.index);
router.post('/helpEmail', HelpController.create);
router.get('/news', NewsController.index);

router.get('/stem', StemController.index);

//----- After this point, the user needs autentication -----
router.use(authMiddleware);

//Output Admin area
router.post('/outputResults', OutputResultController.create);
router.delete('/outputResults/:id', OutputResultController.delete);
router.put('/outputResults/:id', OutputResultController.update);

router.get('/log', adminMiddleware, LoggerController.index);

// Stem Admin area
router.post('/stem', StemController.create);
router.delete('/stem/:id', StemController.delete);
router.put('/stem/:id', StemController.update);

//News Area
router.post('/news', NewsController.create);
router.delete('/news/:id', NewsController.delete);
router.put('/news/:id', NewsController.update);
router.post('/resultNews', NewsController.createFromResults);

//User area
router.get('/users', UserController.index);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', adminMiddleware, UserController.delete);

// School area
router.post('/schools', adminMiddleware, SchoolController.create);
router.delete('/schools/:id', adminMiddleware, SchoolController.delete);
router.put('/schools/:id', SchoolController.update);

//Autentication area

//Project area
router.get('/projects', ProjectController.index);
router.get('/projects/:id', ProjectController.findOne);
router.post('/projects', ProjectController.create);
router.delete('/projects/:id', ProjectController.delete);
router.put('/projects/:id', ProjectController.update);

//ProjectUser area
router.get('/projects/:id/users', ProjectUser.index);
router.post('/projectUser', ProjectUser.create);
router.get('/projectUser/:projectId/permissions/edit', ProjectUser.canEdit);
router.delete('/projectUser/:id', ProjectUser.delete);

//Result area
router.get('/projects/:id/results', ResultController.index);
router.post('/results', ResultController.create);
router.delete('/results/:id', ResultController.delete);
router.put('/results/:id', ResultController.update);

//Activity Area
router.get('/projects/:id/activities', ActivityController.index);
router.post('/activities', ActivityController.create);
router.delete('/activities/:id', ActivityController.delete);
router.put('/activities/:id', ActivityController.update);
router.get('/activities', ActivityController.list);
router.post('/allActivities', ActivityController.createsAll);

//Roles Area
router.get('/roles', authMiddleware, RolesController.index);

router.get('/professors', ProfessorController.index);

//SchoolProject area
router.post('/schoolProjects', SchoolProjectController.create);
router.get('/projects/:id/schools', SchoolProjectController.index);
router.delete('/schoolProjects/:id', SchoolProjectController.delete);

//Emails area
router.post('/sendEmail', EmailController.send);

export default router;
