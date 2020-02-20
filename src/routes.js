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

const router = Router();
const upload = multer(multerConfig);

router.post('/sessions', SessionController.create);
router.post('/signup', UserController.create);

//----- After this point, the user needs autentication -----
router.use(authMiddleware);

//User area
router.post('/users', adminMiddleware, UserController.create);
router.get('/users', UserController.index);
router.put('/users/:id', adminMiddleware, UserController.update);
router.delete('/users/:id', adminMiddleware, UserController.delete);

// School area
router.get('/schools', SchoolController.index);
router.post('/schools', adminMiddleware, SchoolController.create);
router.delete('/schools/:id', adminMiddleware, SchoolController.delete);
router.put('/schools/:id', adminMiddleware, SchoolController.update);

//Autentication area

//Files area
router.post('/files', upload.single('file'), FileController.create);

//Project area
router.get('/projects', ProjectController.index);
router.post('/projects', ProjectController.create);
router.delete('/projects/:id', ProjectController.delete);
router.put('/projects/:id', ProjectController.update);

router.get('/roles', authMiddleware, RolesController.index);

//SchoolProject area
router.post('/schoolProjects', SchoolProjectController.create);
router.get('/projects/:id/schools', SchoolProjectController.index);
router.delete('/schoolProjects/:id', SchoolProjectController.delete);

export default router;
