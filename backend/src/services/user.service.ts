import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export const getUserProfile = async (req: Request, res: Response) => {
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
  res.json(user);
};
