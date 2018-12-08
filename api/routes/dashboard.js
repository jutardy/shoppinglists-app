import express from 'express';
import dashboardController from '../controllers/dashboardController';

const router = express.Router();

router.get('/items', dashboardController.getItems);
router.get('/lists', dashboardController.getLists);
router.get('/users', dashboardController.getUsers);
router.get('/users/last', dashboardController.getLastUsers);

export default router;