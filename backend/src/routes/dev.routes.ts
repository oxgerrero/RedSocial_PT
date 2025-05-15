import { Router } from 'express';
import { initializeUsersPasswords } from '../services/initUsers.service';

export const devRouter = Router();

// Ruta temporal solo para inicializar claves
devRouter.post('/init-passwords', async (_req, res) => {
  await initializeUsersPasswords();
  res.json({ message: 'Passwords initialized successfully.' });
});
