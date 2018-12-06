import express from 'express';
import shoppingItemController from '../controllers/shoppingItemController';

const router = express.Router();

router.get('/:id', shoppingItemController.getItems);
router.post('/', shoppingItemController.createItem);
router.put('/', shoppingItemController.updateItem);
router.delete('/', shoppingItemController.deleteItem);
router.delete('/all', shoppingItemController.deleteList);

export default router;