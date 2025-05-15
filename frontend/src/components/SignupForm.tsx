import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-hot-toast';

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

export const SignupForm = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    alias: '',
    fecha_nacimiento: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    setIsLoading(true);
    try {
      const { data } = await axiosClient.post('/auth/register', {
        nombre: form.nombre,
        apellido: form.apellido,
        alias: form.alias,
        fecha_nacimiento: form.fecha_nacimiento,
        email: form.email,
        password: form.password,
      });

      console.log('Registro exitoso, respuesta:', data);

      // Guardar el token en localStorage o authStore
      localStorage.setItem('token', data.token);

      toast.success('Usuario registrado exitosamente. Redirigiendo...');

      setTimeout(() => {
        navigate('/posts');
      }, 2000);
    } catch (error: any) {
      console.error(error);
      if (!error.response) {
        toast.error('Servidor no disponible.');
      } else {
        toast.error(error.response.data.message || 'Error en registro.');
      }
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="border p-2 rounded-lg"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
      />
      {errors.nombre && <small className="text-red-500">{errors.nombre}</small>}

      <input
        className="border p-2 rounded-lg"
        name="apellido"
        placeholder="Apellido"
        value={form.apellido}
        onChange={handleChange}
      />
      {errors.apellido && <small className="text-red-500">{errors.apellido}</small>}

      <input
        className="border p-2 rounded-lg"
        name="alias"
        placeholder="Alias"
        value={form.alias}
        onChange={handleChange}
      />
      {errors.alias && <small className="text-red-500">{errors.alias}</small>}

      <input
        className="border p-2 rounded-lg"
        type="date"
        name="fecha_nacimiento"
        value={form.fecha_nacimiento}
        onChange={handleChange}
      />
      {errors.fecha_nacimiento && <small className="text-red-500">{errors.fecha_nacimiento}</small>}

      <input
        className="border p-2 rounded-lg"
        name="email"
        placeholder="Correo Electrónico"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <small className="text-red-500">{errors.email}</small>}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          className="w-full border p-3 rounded-lg pr-10"
          placeholder="Contraseña segura"
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>
      {errors.password && <small className="text-red-500">{errors.password}</small>}

      <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600" disabled={isLoading}>
        {isLoading ? (
          <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          'Registrar'
        )}
      </button>
    </form>
  );
};
