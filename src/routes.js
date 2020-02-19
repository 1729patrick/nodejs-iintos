import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SchoolController from './app/controllers/SchoolController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProjectController from "./app/controllers/ProjectController";

const router = Router();
const upload = multer(multerConfig);

//User area
router.post('/users', UserController.create);
router.get('/schools', SchoolController.index);

//Autentication area
router.post('/sessions', SessionController.create);

//Files area
router.post('/files', upload.single('file'), FileController.create);

//Project area
router.get('/projects', ProjectController.index);
router.post('/projects', ProjectController.create);
router.delete('/projects/:id', ProjectController.delete);
router.put('/projects/:id', ProjectController.update);


export default router;
