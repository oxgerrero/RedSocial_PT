import axios from 'axios';
import { useAuthStore } from '../context/authStore';

// Creamos la instancia de Axios
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://backend:3000/api', // Ajusta tu URL si es necesario
});

// Interceptor para incluir token en headers automáticamente
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // o desde tu authStore
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores 401 automáticamente
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('No autorizado. Cerrando sesión...');
      localStorage.removeItem('token');
      window.location.href = '/'; // Redirigir automáticamente al login
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
