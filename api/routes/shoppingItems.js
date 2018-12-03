import express from 'express';
import shoppingItemController from '../controllers/shoppingItemController';

const router = express.Router();

router.get('/:id', shoppingItemController.getItems);
router.post('/', shoppingItemController.createItem);
router.delete('/:id', shoppingItemController.deleteItem);

export default router;