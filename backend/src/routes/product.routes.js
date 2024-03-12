import { Router } from 'express';

import { ProductController } from '../controllers/index.js';
import { ProductModel } from '../models/index.js';

const productRouter = Router();

const productController = new ProductController({
	productModel: ProductModel,
});

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.post('/', productController.createProduct);
productRouter.delete('/:id', productController.deleteProduct);
productRouter.patch('/:id', productController.updateProduct);

export { productRouter };
