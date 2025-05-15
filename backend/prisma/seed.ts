// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Crear usuarios
  const juan = await prisma.user.create({
    data: {
      nombre: 'Juan',
      apellido: 'Pérez',
      alias: 'juanp',
      fecha_nacimiento: new Date('1990-01-01'),
      email: 'juan@example.com',
      password: 'hashed_password_juan',
    },
  });

  const ana = await prisma.user.create({
    data: {
      nombre: 'Ana',
      apellido: 'Martínez',
      alias: 'anam',
      fecha_nacimiento: new Date('1992-03-15'),
      email: 'ana@example.com',
      password: 'hashed_password_ana',
    },
  });

  const carlos = await prisma.user.create({
    data: {
      nombre: 'Carlos',
      apellido: 'Gómez',
      alias: 'carlosg',
      fecha_nacimiento: new Date('1988-07-20'),
      email: 'carlos@example.com',
      password: 'hashed_password_carlos',
    },
  });

  const lucia = await prisma.user.create({
    data: {
      nombre: 'Lucía',
      apellido: 'Torres',
      alias: 'luciat',
      fecha_nacimiento: new Date('1995-11-25'),
      email: 'lucia@example.com',
      password: 'hashed_password_lucia',
    },
  });

  // Crear publicaciones
  const postJuan = await prisma.post.create({
    data: {
      userId: juan.id,
      contenido: '¡Hola mundo desde Juan!',
      fecha_publicacion: new Date(),
    },
  });

  const postAna = await prisma.post.create({
    data: {
      userId: ana.id,
      contenido: 'Ana está disfrutando su día.',
      fecha_publicacion: new Date(),
    },
  });

  const postCarlos = await prisma.post.create({
    data: {
      userId: carlos.id,
      contenido: 'Carlos posteando sobre programación.',
      fecha_publicacion: new Date(),
    },
  });

  const postLucia = await prisma.post.create({
    data: {
      userId: lucia.id,
      contenido: 'Lucía ama el café y los libros.',
      fecha_publicacion: new Date(),
    },
  });

  // Crear reacciones
  await prisma.reaction.createMany({
    data: [
      { userId: ana.id, postId: postJuan.id, type: 'love' },
      { userId: carlos.id, postId: postJuan.id, type: 'like' },
      { userId: juan.id, postId: postAna.id, type: 'laugh' },
      { userId: lucia.id, postId: postCarlos.id, type: 'wow' },
    ],
  });

  // Crear comentarios
  await prisma.comment.createMany({
    data: [
      { userId: ana.id, postId: postJuan.id, content: '¡Muy buen post Juan!' },
      { userId: carlos.id, postId: postAna.id, content: '¡Me alegra Ana!' },
      { userId: juan.id, postId: postCarlos.id, content: '¡Qué interesante Carlos!' },
      { userId: lucia.id, postId: postLucia.id, content: 'Totalmente de acuerdo Lucía.' },
    ],
  });

  // Crear reposts
  await prisma.repost.createMany({
    data: [
      { userId: ana.id, originalPostId: postJuan.id },
      { userId: carlos.id, originalPostId: postAna.id },
      { userId: lucia.id, originalPostId: postCarlos.id },
      { userId: juan.id, originalPostId: postLucia.id },
    ],
  });

  console.log('🌱 Database seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
