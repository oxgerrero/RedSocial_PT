import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        nombre: true,
        apellido: true,
        alias: true,
        fecha_nacimiento: true,
        email: true,
      },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
