import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

const passwordSchema = z.object({
  oldPassword: z.string().nonempty('Contraseña actual requerida'),
  newPassword: z.string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Debe tener una mayúscula')
    .regex(/[a-z]/, 'Debe tener una minúscula')
    .regex(/[0-9]/, 'Debe tener un número')
    .regex(/[^A-Za-z0-9]/, 'Debe tener un carácter especial'),
});

export const ChangePasswordPage = () => {
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
      toast.success('Contraseña actualizada exitosamente.');
      navigate('/profile');
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error actualizando contraseña.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Cambiar Contraseña
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div>
            <input
              type="password"
              name="oldPassword"
              className="w-full border p-3 rounded-lg"
              placeholder="Contraseña actual"
              value={form.oldPassword}
              onChange={handleChange}
            />
            {errors.oldPassword && (
              <small className="text-red-500">{errors.oldPassword}</small>
            )}
          </div>

          <div>
            <input
              type="password"
              name="newPassword"
              className="w-full border p-3 rounded-lg"
              placeholder="Nueva contraseña"
              value={form.newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && (
              <small className="text-red-500">{errors.newPassword}</small>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Guardar Nueva Contraseña
          </button>

        </form>
      </div>
    </div>
  );
};
