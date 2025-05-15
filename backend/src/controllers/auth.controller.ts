import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';

// Login Controller
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (error: any) {
    console.error('Login error:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Register Controller
export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, alias, fecha_nacimiento, email, password } = req.body;
    const token = await registerUser(nombre, apellido, alias, new Date(fecha_nacimiento), email, password);
    res.status(201).json({ token });
  } catch (error: any) {
    console.error('Register error:', error.message);
    res.status(400).json({ message: error.message });
  }
};
