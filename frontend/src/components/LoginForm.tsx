import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useAuthStore } from '../context/authStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axiosClient.post('/auth/login', { email, password });
      setToken(data.token);
      navigate('/posts');
    } catch (error) {
      console.error(error);
      toast.error('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};
