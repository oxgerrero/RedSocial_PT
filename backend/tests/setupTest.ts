import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Antes de cada suite de tests
beforeAll(async () => {
  console.log('🚀 Preparando base de datos de test...');

  // Ejecuta migraciones si quieres (opcional)
  try {
    execSync('pnpm prisma migrate deploy');
  } catch (error) {
    console.error('Error aplicando migraciones:', error);
  }

  // Opcionalmente puedes limpiar datos manualmente aquí
  await prisma.reaction.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.repost.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
});

// Después de todos los tests
afterAll(async () => {
  console.log('🧹 Limpiando y cerrando base de datos de test...');
  await prisma.$disconnect();
});
