import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { PostsPage } from '../pages/PostsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { SignupPage } from '../pages/SignupPage';
import { useAuthStore } from '../context/authStore';
import { ChangePasswordPage } from '../pages/ChangePasswordPage';
import { EditProfilePage } from '../pages/EditProfilePage';
import { toast } from 'react-hot-toast';

// Componente para proteger rutas privadas
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuthStore();
  
  if (!token) {
    toast.error('Acceso no autorizado. Por favor inicia sesión.');
    return <Navigate to="/" />;
  }

  return children;
};


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Private routes */}
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <PostsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <PrivateRoute>
              <ChangePasswordPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};