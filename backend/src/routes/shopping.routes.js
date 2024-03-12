import { Router } from 'express';

import { ShoppingModel } from '../models/index.js';
import { ShoppingController } from '../controllers/index.js';

const shoppingRouter = Router();

const shoppingController = new ShoppingController({
	shoppingModel: ShoppingModel,
});

shoppingRouter.get('/', shoppingController.getAllShopping);
shoppingRouter.get('/:id', shoppingController.getShoppingById);
shoppingRouter.post('/', shoppingController.createShopping);

export { shoppingRouter };
