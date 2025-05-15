import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../context/authStore';

export const Navbar = () => {
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo o nombre */}
        <Link to="/posts" className="text-2xl font-bold text-blue-600">
          RedSocial_PT
        </Link>

        {/* Navegación */}
        <div className="flex space-x-6">
          <Link
            to="/posts"
            className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
          >
            Inicio
          </Link>

          <Link
            to="/profile"
            className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
          >
            Perfil
          </Link>

          {token && (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-500 transition-colors font-medium"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
