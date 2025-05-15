import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json';
import { authRouter } from './routes/auth.routes';
import { postRouter } from './routes/post.routes';
import { userRouter } from './routes/user.routes';
import { devRouter } from './routes/dev.routes';
import { authLimiter } from './middlewares/rateLimit.middleware';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173'], // ⚡ cambiar en producción
  credentials: true,
}));
app.use(express.json());

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
//otros services
app.use('/api/dev', devRouter);

//Limites de peticiones
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
