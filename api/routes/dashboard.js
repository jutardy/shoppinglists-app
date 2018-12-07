import express from 'express';
import dashboardController from '../controllers/dashboardController';
import { verifyJWTToken } from '../libs/token';

const router = express.Router();

router.use(verifyJWTToken);

router.get('/items', dashboardController.getItems);
router.get('/lists', dashboardController.getLists);
router.get('/users', dashboardController.getUsers);
router.get('/users/last', dashboardController.getLastUsers);

export default router;