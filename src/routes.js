import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SchoolController from './app/controllers/SchoolController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

const router = Router();
const upload = multer(multerConfig);

router.post('/users', UserController.store);
router.get('/schools', SchoolController.index);

router.post('/sessions', SessionController.store);

router.post('/files', upload.single('file'), FileController.store);

export default router;
