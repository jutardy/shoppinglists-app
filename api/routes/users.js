import express from 'express';
import userController from '../controllers/userController';
import { verifyJWTToken } from '../libs/token';

const router = express.Router();

router.use(verifyJWTToken);

router.get('/:id', userController.getUser);

export default router;