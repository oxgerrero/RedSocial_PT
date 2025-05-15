import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuthStore } from '../context/authStore';
import { toast } from 'react-hot-toast';

export const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<any>({});
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors: any = {};
    if (!form.email.includes('@')) errors.email = 'Correo inválido';
    if (form.password.length < 8) errors.password = 'Mínimo 8 caracteres';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { data } = await axiosClient.post('/auth/login', form);
      setToken(data.token);
      toast.success('Login exitoso!');
      navigate('/posts');
    } catch (error: any) {
      console.error(error);
      if (!error.response) {
        toast.error('Servidor no disponible.');
      } else {
        toast.error(error.response.data.message || 'Error en login.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="border p-2 rounded-lg"
        name="email"
        placeholder="Correo Electrónico"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <small className="text-red-500">{errors.email}</small>}

      <input
        className="border p-2 rounded-lg"
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
      />
      {errors.password && <small className="text-red-500">{errors.password}</small>}

      <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
        Ingresar
      </button>
    </form>
  );
};
