import { prisma } from '../prisma/client';
import bcrypt from 'bcryptjs';

export const initializeUsersPasswords = async () => {
  try {
    console.log('🔐 Inicializando contraseñas de usuarios existentes...');
    
    const users = await prisma.user.findMany();

    const passwordHash = await bcrypt.hash('123456', 10); // ✅ Hash de la contraseña genérica

    for (const user of users) {
      await prisma.user.update({
        where: { id: user.id },
        data: { password: passwordHash },
      });
    }

    console.log('✅ Contraseñas inicializadas exitosamente.');
  } catch (error) {
    console.error('Error inicializando contraseñas:', error);
  }
};
