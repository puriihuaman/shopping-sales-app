import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { UserModel } from '../models/user.model.js';

const userRouter = Router();

const userController = new UserController({ userModel: UserModel });

userRouter.get('/', userController.getAll);
userRouter.post('/', userController.createUser);

export { userRouter };
