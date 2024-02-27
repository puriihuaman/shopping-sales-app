import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller.js';
import { ProfileModel } from '../models/profile.model.js';
import { checkAuth } from '../middlewares/auth.middleware.js';

const profileRouter = Router();

const profileController = new ProfileController({ profileModel: ProfileModel });

profileRouter.get('/', checkAuth, profileController.getAll);
profileRouter.get('/:id', checkAuth, profileController.getById);
profileRouter.post('/', checkAuth, profileController.createProfile);
profileRouter.delete('/:id', checkAuth, profileController.deleteProfile);
profileRouter.patch('/:id', checkAuth, profileController.updateProfile);

export { profileRouter };
