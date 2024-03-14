import { Router } from 'express';
import { SaleController } from '../controllers/index.js';
import { SaleModel } from '../models/index.js';

const saleRouter = Router();

const saleController = new SaleController({ saleModel: SaleModel });

saleRouter.get('/', saleController.getAllSales);
saleRouter.get('/:id', saleController.getSalesById);
saleRouter.post('/cart', saleController.calculateSalesTotal);
saleRouter.post('/', saleController.createSale);

export { saleRouter };
