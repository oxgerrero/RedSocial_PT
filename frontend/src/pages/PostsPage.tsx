import { useState, useEffect } from 'react';
import { usePostStore } from '../context/postStore';
import axiosClient from '../api/axiosClient';
import { PostItem } from '../components/PostItem';
import { Navbar } from '../components/Navbar';
import { motion } from 'framer-motion';
import { PostCard } from '../components/PostCard'; 
import { NewPostModal } from '../components/NewPostModal';

export const PostsPage = () => {
  const { posts, setPosts } = usePostStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axiosClient.get('/posts');
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-6">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg mb-6 w-full"
          onClick={() => setIsModalOpen(true)}
        >
          Crear Nueva Publicación
        </button>

        <NewPostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
