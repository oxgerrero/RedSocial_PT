import { useAuthStore } from '../context/authStore';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <button onClick={() => navigate('/posts')}>Posts</button>
      <button onClick={() => navigate('/profile')}>Perfil</button>
      <button onClick={handleLogout}>Salir</button>
    </nav>
  );
};
