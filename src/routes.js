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

import EventController from './app/controllers/EventController';

const router = Router();
const upload = multer(multerConfig);

router.use(publicMiddleware);

router.post('/api/signup', UserController.create); // create user
router.post('/api/sessions', SessionController.create); // Log in
router.post('/api/users', authMiddleware, UserController.create); // User created by the admin

// Middleware to record the logs

router.use(loggerMiddleware);

router.post('/api/files', upload.single('file'), FileController.create);
router.get('/api/schools', SchoolController.index);

router.get('/api/outputResults', OutputResultController.index);
router.post('/api/helpEmail', HelpController.create);
router.get('/api/news', NewsController.index);

router.get('/api/stem', StemController.index);

// Event area
router.get('/api/events', EventController.index);

// ----- After this point, the user needs autentication -----
router.use(authMiddleware);

router.post('/api/events', EventController.create);
router.put('/api/events/:id', EventController.update);
router.delete('/api/events/:id', EventController.delete);

// Output Admin area
router.post('/api/outputResults', OutputResultController.create);
router.delete('/api/outputResults/:id', OutputResultController.delete);
router.put('/api/outputResults/:id', OutputResultController.update);

router.get('/api/log', adminMiddleware, LoggerController.index);

// Stem Admin area
router.post('/api/stem', StemController.create);
router.delete('/api/stem/:id', StemController.delete);
router.put('/api/stem/:id', StemController.update);

// News Area
router.post('/api/news', NewsController.create);
router.delete('/api/news/:id', NewsController.delete);
router.put('/api/news/:id', NewsController.update);
router.post('/api/resultNews', NewsController.createFromResults);

// User area
router.get('/api/users', UserController.index);
router.put('/api/users/:id', UserController.update);
router.delete('/api/users/:id', adminMiddleware, UserController.delete);

// School area
router.post('/api/schools', adminMiddleware, SchoolController.create);
router.delete('/api/schools/:id', adminMiddleware, SchoolController.delete);
router.put('/api/schools/:id', SchoolController.update);

// Autentication area

// Project area
router.get('/api/projects', ProjectController.index);
router.get('/api/projects/:id', ProjectController.findOne);
router.post('/api/projects', ProjectController.create);
router.delete('/api/projects/:id', ProjectController.delete);
router.put('/api/projects/:id', ProjectController.update);

// ProjectUser area
router.get('/api/projects/:id/users', ProjectUser.index);
router.post('/api/projectUser', ProjectUser.create);
router.get('/api/projectUser/:projectId/permissions/edit', ProjectUser.canEdit);
router.delete('/api/projectUser/:id', ProjectUser.delete);

// Result area
router.get('/api/projects/:id/results', ResultController.index);
router.post('/api/results', ResultController.create);
router.delete('/api/results/:id', ResultController.delete);
router.put('/api/results/:id', ResultController.update);

// Activity Area
router.get('/api/projects/:id/activities', ActivityController.index);
router.post('/api/activities', ActivityController.create);
router.delete('/api/activities/:id', ActivityController.delete);
router.put('/api/activities/:id', ActivityController.update);
router.get('/api/activities', ActivityController.list);
router.post('/api/allActivities', ActivityController.createsAll);

// Roles Area
router.get('/api/roles', authMiddleware, RolesController.index);

router.get('/api/professors', ProfessorController.index);

// SchoolProject area
router.post('/api/schoolProjects', SchoolProjectController.create);
router.get('/api/projects/:id/schools', SchoolProjectController.index);
router.delete('/api/schoolProjects/:id', SchoolProjectController.delete);

// Emails area
router.post('/api/sendEmail', EmailController.send);

export default router;
