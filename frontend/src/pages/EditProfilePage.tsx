import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { Navbar } from '../components/Navbar';
import { z } from 'zod';
import { toast } from 'react-hot-toast';

// Esquema de validación
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
          nombre: data.nombre || '',
          apellido: data.apellido || '',
          alias: data.alias || '',
          fecha_nacimiento: data.fecha_nacimiento?.split('T')[0] || '',
        });
      } catch (error) {
        console.error(error);
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
      console.error(error);
      if (!error.response) {
        toast.error('Servidor no disponible. Intenta más tarde.');
      } else {
        toast.error(error.response?.data?.message || 'Error actualizando perfil.');
      }
    }
  };

  return (
    <div className="edit-profile-container">
      <Navbar />
      <h2>Editar Perfil</h2>
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

        <button type="submit">Actualizar Perfil</button>
      </form>
    </div>
  );
};
