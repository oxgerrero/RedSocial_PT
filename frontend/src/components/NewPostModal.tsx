import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axiosClient from '../api/axiosClient';
import { usePostStore } from '../context/postStore';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewPostModal = ({ isOpen, onClose }: NewPostModalProps) => {
  const [contenido, setContenido] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setPosts } = usePostStore();

  const fetchPosts = async () => {
    const { data } = await axiosClient.get('/posts');
    setPosts(data);
  };

  const handlePublish = async () => {
    if (!contenido.trim()) {
      toast.error('El contenido no puede estar vacío.');
      return;
    }
    setIsLoading(true);
    try {
      await axiosClient.post('/posts', { contenido });
      toast.success('Publicación creada exitosamente.');
      setContenido('');
      onClose();
      fetchPosts();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error creando publicación.');
    } finally {
      setIsLoading(false); // 👈 termina carga
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Crear Publicación
        </h2>

        <textarea
          className="w-full border p-3 rounded-lg resize-none h-28 mb-4"
          placeholder="¿Qué quieres compartir?"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          disabled={isLoading}
        />

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            disabled={isLoading}
          >
            Cancelar
          </button>

          <button
            onClick={handlePublish}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Publicar'
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
