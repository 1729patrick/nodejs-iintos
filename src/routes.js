import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth'; // Need to be autentication
import adminMiddleware from './app/middlewares/admin'; // Need to be Admin Autentication

import UserController from './app/controllers/UserController';
import SchoolController from './app/controllers/SchoolController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProjectController from './app/controllers/ProjectController';
import RolesController from './app/controllers/RolesController';
import SchoolProjectController from './app/controllers/SchoolProjectController';
import ActivityController from './app/controllers/ActivityController';
import ProjectUser from './app/controllers/ProjectUserController';
import ResultController from './app/controllers/ResultController';

const router = Router();
const upload = multer(multerConfig);

router.post('/sessions', SessionController.create);
router.post('/signup', UserController.create);
router.post('/files', upload.single('file'), FileController.create);
router.get('/schools', SchoolController.index);

//----- After this point, the user needs autentication -----
router.use(authMiddleware);

//User area
router.post('/users', adminMiddleware, UserController.create);
router.get('/users', UserController.index);
router.put('/users/:id', adminMiddleware, UserController.update);
router.delete('/users/:id', adminMiddleware, UserController.delete);

// School area
router.post('/schools', adminMiddleware, SchoolController.create);
router.delete('/schools/:id', adminMiddleware, SchoolController.delete);
router.put('/schools/:id', adminMiddleware, SchoolController.update);

//Autentication area

//Project area
router.get('/projects', ProjectController.index);
router.get('/projects/:id', ProjectController.findOne);
router.post('/projects', ProjectController.create);
router.delete('/projects/:id', ProjectController.delete);
router.put('/projects/:id', ProjectController.update);

//ProjectUser area
router.get('/projects/:id/users', ProjectUser.index);

//Project Result area
router.get('/projects/:id/results', ResultController.index);
router.post('/results', ResultController.create);
router.delete('/results/:id', ResultController.delete);
router.put('/results/:id', ResultController.update);

//Activity Area
router.get('/projects/:id/activities', ActivityController.index);
router.post('/activities', ActivityController.create);
router.delete('/activities/:id', ActivityController.delete);
router.put('/activities/:id', ActivityController.update);

//Roles Area
router.get('/roles', authMiddleware, RolesController.index);

//SchoolProject area
router.post('/schoolProjects', SchoolProjectController.create);
router.get('/projects/:id/schools', SchoolProjectController.index);
router.delete('/schoolProjects/:id', SchoolProjectController.delete);

export default router;
