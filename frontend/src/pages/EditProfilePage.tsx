import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

const profileSchema = z.object({
  nombre: z.string().min(2, 'Nombre muy corto'),
  apellido: z.string().min(2, 'Apellido muy corto'),
  alias: z.string().min(3, 'Alias muy corto'),
  fecha_nacimiento: z.string().nonempty('Fecha obligatoria'),
});

export const EditProfilePage = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    alias: '',
    fecha_nacimiento: '',
  });
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosClient.get('/users/profile');
        setForm({
          nombre: data.nombre,
          apellido: data.apellido,
          alias: data.alias,
          fecha_nacimiento: data.fecha_nacimiento?.split('T')[0],
        });
      } catch (error) {
        console.error('Error cargando perfil:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    try {
      profileSchema.parse(form);
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
      await axiosClient.put('/users/update-profile', form);
      toast.success('Perfil actualizado exitosamente.');
      navigate('/profile');
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error actualizando perfil.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Editar Perfil
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div>
            <input
              name="nombre"
              className="w-full border p-3 rounded-lg"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
            />
            {errors.nombre && <small className="text-red-500">{errors.nombre}</small>}
          </div>

          <div>
            <input
              name="apellido"
              className="w-full border p-3 rounded-lg"
              placeholder="Apellido"
              value={form.apellido}
              onChange={handleChange}
            />
            {errors.apellido && <small className="text-red-500">{errors.apellido}</small>}
          </div>

          <div>
            <input
              name="alias"
              className="w-full border p-3 rounded-lg"
              placeholder="Alias"
              value={form.alias}
              onChange={handleChange}
            />
            {errors.alias && <small className="text-red-500">{errors.alias}</small>}
          </div>

          <div>
            <input
              type="date"
              name="fecha_nacimiento"
              className="w-full border p-3 rounded-lg"
              value={form.fecha_nacimiento}
              onChange={handleChange}
            />
            {errors.fecha_nacimiento && <small className="text-red-500">{errors.fecha_nacimiento}</small>}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Guardar Cambios
          </button>

        </form>
      </div>
    </div>
  );
};
