import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller.js';
import { ProfileModel } from '../models/profile.model.js';

const profileRouter = Router();

const profileController = new ProfileController({ profileModel: ProfileModel });

profileRouter.get('/', profileController.getAll);
profileRouter.post('/', profileController.createProfile);

export { profileRouter };
