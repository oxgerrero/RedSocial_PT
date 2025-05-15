import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { Navbar } from '../components/Navbar';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../context/authStore';

// Esquema de validación
const passwordSchema = z.object({
  oldPassword: z.string().min(8, 'Contraseña actual mínima 8 caracteres.'),
  newPassword: z.string()
    .min(8, 'Nueva contraseña mínima 8 caracteres.')
    .regex(/[A-Z]/, 'Debe contener una mayúscula.')
    .regex(/[a-z]/, 'Debe contener una minúscula.')
    .regex(/[0-9]/, 'Debe contener un número.')
    .regex(/[^A-Za-z0-9]/, 'Debe contener un caracter especial.')
});

export const ChangePasswordPage = () => {
  const { logout } = useAuthStore();
  
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    try {
      passwordSchema.parse(form);
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
      await axiosClient.put('/users/change-password', form);
      toast.success('Contraseña actualizada correctamente. Por favor vuelve a iniciar sesión.');
      logout();
      navigate('/');
    } catch (error: any) {
      console.error(error);
      if (!error.response) {
        toast.error('Servidor no disponible. Intenta más tarde.');
      } else {
        toast.error(error.response?.data?.message || 'Error cambiando contraseña.');
      }
    }
  };

  return (
    <div className="change-password-container">
      <Navbar />
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        
        <input
          type="password"
          name="oldPassword"
          placeholder="Contraseña Actual"
          value={form.oldPassword}
          onChange={handleChange}
        />
        {errors.oldPassword && <small>{errors.oldPassword}</small>}

        <input
          type="password"
          name="newPassword"
          placeholder="Nueva Contraseña Segura"
          value={form.newPassword}
          onChange={handleChange}
        />
        {errors.newPassword && <small>{errors.newPassword}</small>}

        <button type="submit">Actualizar Contraseña</button>
      </form>
    </div>
  );
};
