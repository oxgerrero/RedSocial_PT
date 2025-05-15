import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

// Definir esquema de validación
const signupSchema = z.object({
  nombre: z.string().min(2, 'Nombre muy corto'),
  apellido: z.string().min(2, 'Apellido muy corto'),
  alias: z.string().min(3, 'Alias muy corto'),
  fecha_nacimiento: z.string().nonempty('Fecha obligatoria'),
  email: z.string().email('Email inválido'),
  password: z.string()
    .min(8, 'La contraseña debe tener mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un caracter especial'),
});

export const SignupPage = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    alias: '',
    fecha_nacimiento: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    try {
      signupSchema.parse(form);
      setErrors({});
      return true;
    } catch (err: any) {
      const fieldErrors: any = {};
      err.errors.forEach((error: any) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axiosClient.post('/auth/register', form);
      toast.success('Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
      navigate('/');
    } catch (error: any) {
      console.error(error);
      if (!error.response) {
        toast.error('Servidor no disponible. Intenta más tarde.');
      } else {
        toast.error(error.response.data.message || 'Error en registro.');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="signup-container">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>

          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <small>{errors.nombre}</small>}

          <input
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
          />
          {errors.apellido && <small>{errors.apellido}</small>}

          <input
            name="alias"
            placeholder="Alias"
            value={form.alias}
            onChange={handleChange}
          />
          {errors.alias && <small>{errors.alias}</small>}

          <input
            type="date"
            name="fecha_nacimiento"
            value={form.fecha_nacimiento}
            onChange={handleChange}
          />
          {errors.fecha_nacimiento && <small>{errors.fecha_nacimiento}</small>}

          <input
            name="email"
            placeholder="Correo Electrónico"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <small>{errors.email}</small>}

          <input
            type="password"
            name="password"
            placeholder="Contraseña segura"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <small>{errors.password}</small>}

          <button type="submit">Registrar</button>
        </form>
      </div>
    </motion.div>
  );
};
