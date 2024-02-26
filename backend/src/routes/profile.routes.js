import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller.js';
import { ProfileModel } from '../models/profile.model.js';

const profileRouter = Router();

const profileController = new ProfileController({ profileModel: ProfileModel });

profileRouter.get('/', profileController.getAll);
profileRouter.get('/:id', profileController.getById);
profileRouter.post('/', profileController.createProfile);
profileRouter.delete('/:id', profileController.deleteProfile);
profileRouter.patch('/:id', profileController.updateProfile);

export { profileRouter };
