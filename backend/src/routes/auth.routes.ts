import { Router } from 'express';
import { loginUser } from '../services/auth.service';

export const authRouter = Router();

authRouter.post('/login', loginUser);
