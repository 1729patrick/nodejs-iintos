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

const router = Router();
const upload = multer(multerConfig);

router.post('/sessions', SessionController.create);

//----- After this point, the user needs autentication -----
router.use(authMiddleware);

//User area
router.get('/users', UserController.index);
router.post('/users', UserController.create);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

// School area
router.get('/schools', SchoolController.index);
router.post('/schools', adminMiddleware, SchoolController.create);
router.delete('/schools/:id', adminMiddleware, SchoolController.delete);
router.put('/schools/:id', adminMiddleware, SchoolController.update);

//Autentication area

//Files area
router.post('/files', upload.single('file'), FileController.create);

//Project area
router.get('/projects', authMiddleware, ProjectController.index);
router.post('/projects', authMiddleware, ProjectController.create);
router.delete('/projects/:id', authMiddleware, ProjectController.delete);
router.put('/projects/:id', authMiddleware, ProjectController.update);

export default router;
