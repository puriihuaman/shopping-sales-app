import { Router } from 'express';

import { UserController } from '../controllers/index.js';
import { UserModel } from '../models/user.model.js';

const userRouter = Router();

const userController = new UserController({ userModel: UserModel });

userRouter.post('/', userController.createUser);
userRouter.patch('/:id', userController.updateUser);
userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.delete('/:id', userController.deleteUser);

export { userRouter };
