import { Router } from 'express';
import { getProfile, changePassword, updateProfile } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth.middleware';

export const userRouter = Router();

userRouter.use(verifyToken);

userRouter.get('/profile', getProfile);
userRouter.put('/change-password', changePassword);
userRouter.put('/update-profile', updateProfile);
