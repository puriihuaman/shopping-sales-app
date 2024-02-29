import { Router } from 'express';

import { ProfileController } from '../controllers/index.js';
import { checkAuth, checkProfileAuth } from '../middlewares/auth.middleware.js';
import { ProfileModel } from '../models/index.js';

const profileRouter = Router();

const profileController = new ProfileController({ profileModel: ProfileModel });

profileRouter.get(
	'/',
	checkAuth,
	checkProfileAuth({ profiles: ['administrador'] }),
	profileController.getAllProfiles
);
profileRouter.get(
	'/:id',
	checkAuth,
	checkProfileAuth({ profiles: ['administrador'] }),
	profileController.getById
);
profileRouter.post(
	'/',
	checkAuth,
	checkProfileAuth({ profiles: ['administrador'] }),
	profileController.createProfile
);
profileRouter.delete(
	'/:id',
	checkAuth,
	checkProfileAuth({ profiles: ['administrador'] }),
	profileController.deleteProfile
);
profileRouter.patch(
	'/:id',
	checkAuth,
	checkProfileAuth({ profiles: ['administrador'] }),
	profileController.updateProfile
);

export { profileRouter };
