import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Navbar } from '../components/Navbar';

export const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await axiosClient.get('/users/profile');
      setProfile(data);
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Mi Perfil</h2>
      {profile && (
        <div>
          <p><strong>Nombre:</strong> {profile.nombre} {profile.apellido}</p>
          <p><strong>Alias:</strong> {profile.alias}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Fecha de nacimiento:</strong> {profile.fecha_nacimiento}</p>
        </div>
      )}
    </div>
  );
};
