import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SchoolController from './app/controllers/SchoolController';
import SessionController from './app/controllers/SessionController';

const router = Router();

router.post('/users', UserController.store);
router.get('/schools', SchoolController.index);

router.post('/sessions', SessionController.store);

export default router;
