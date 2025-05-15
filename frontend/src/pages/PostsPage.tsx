import { useEffect } from 'react';
import { usePostStore } from '../context/postStore';
import axiosClient from '../api/axiosClient';
import { PostItem } from '../components/PostItem';
import { Navbar } from '../components/Navbar';
import { motion } from 'framer-motion';

export const PostsPage = () => {
  const { posts, setPosts } = usePostStore();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axiosClient.get('/posts');
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <Navbar />
        <h2>Publicaciones</h2>
        {posts.map(post => <PostItem key={post.id} post={post} />)}
      </div>
    </motion.div>
  );
};
