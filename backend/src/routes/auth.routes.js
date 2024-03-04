import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { UserModel } from '../models/user.model.js';

const authRouter = Router();

const authController = new AuthController({ userModel: UserModel });

authRouter.post('/', authController.loginControl);
// authRouter.post('/', authController.registerUser);

export { authRouter };
