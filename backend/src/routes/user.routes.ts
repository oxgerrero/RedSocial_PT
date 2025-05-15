import { Router } from 'express';
import { getUserProfile } from '../services/user.service';
import { verifyToken } from '../middlewares/auth.middleware';

export const userRouter = Router();

userRouter.use(verifyToken);

userRouter.get('/profile', getUserProfile);
