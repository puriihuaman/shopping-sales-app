import { Router } from 'express';

import { ProviderController } from '../controllers/index.js';
import { ProviderModel } from '../models/index.js';

const providerRouter = Router();

const providerController = new ProviderController({
	providerModel: ProviderModel,
});

providerRouter.get('/', providerController.getProviders);
providerRouter.get('/:id', providerController.getProviderById);
providerRouter.post('/', providerController.createProvider);
providerRouter.delete('/:id', providerController.deleteProvider);
providerRouter.patch('/:id', providerController.updateProvider);

export { providerRouter };
