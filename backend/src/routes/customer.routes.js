import { Router } from 'express';

import { CustomerController } from '../controllers/index.js';
import { CustomerModel } from '../models/index.js';

const customerRouter = Router();

const customerController = new CustomerController({
	customerModel: CustomerModel,
});

customerRouter.post('/', customerController.createCustomer);
customerRouter.patch('/:id', customerController.updateCustomer);
customerRouter.get('/', customerController.getAllCustomers);
customerRouter.get('/:id', customerController.getCustomerById);
customerRouter.delete('/:id', customerController.deleteCustomer);

export { customerRouter };
