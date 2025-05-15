import { Navbar } from '../components/Navbar';
import { useAuthStore } from '../context/authStore';
import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosClient.get('/users/profile');
        setProfile(data);
      } catch (error) {
        console.error('Error cargando perfil:', error);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl flex flex-col items-center text-center">
        {profile ? (
          <>
            {/* Imagen de perfil (opcional) */}
            {/*
            <img
              src="https://i.pravatar.cc/100" // Imagen de prueba
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            */}

            {/* Nombre completo */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {profile.nombre} {profile.apellido}
            </h2>

            {/* Alias */}
            <p className="text-blue-500 font-semibold">@{profile.alias}</p>

            {/* Correo electrónico */}
            <p className="text-gray-600 mt-2">{profile.email}</p>

            {/* Fecha de nacimiento */}
            <p className="text-gray-500 text-sm mt-2">
              Fecha de nacimiento: {new Date(profile.fecha_nacimiento).toLocaleDateString()}
            </p>

            {/* Botones opcionales (editar perfil, etc.) */}
            <div className="flex gap-4 mt-6">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={() => navigate('/edit-profile')}>
                Editar Perfil
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={() => navigate('/change-password')}>
                Cambiar contraseña
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-600">Cargando perfil...</p>
        )}
      </div>
    </div>
  );
};
