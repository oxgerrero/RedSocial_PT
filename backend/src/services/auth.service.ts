import { prisma } from '../prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';
import validator from 'validator';

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Usuario no encontrado.');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Credenciales incorrectas.');

  const token = generateToken(user.id);
  return token;
};

export const registerUser = async (nombre: string, apellido: string, alias: string, fecha_nacimiento: Date, email: string, password: string) => {
  if (!validator.isEmail(email)) {
    throw new Error('Email inválido.');
  }

  if (!validator.isAlphanumeric(alias)) {
    throw new Error('Alias debe ser solo letras o números.');
  }

  if (nombre.length < 2 || apellido.length < 2) {
    throw new Error('Nombre y apellido deben tener mínimo 2 caracteres.');
  }

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { alias }] }
  });

  if (existingUser) throw new Error('Email o alias ya en uso.');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      nombre,
      apellido,
      alias,
      fecha_nacimiento,
      email,
      password: hashedPassword
    }
  });

  const token = generateToken(user.id);
  return token;
};
