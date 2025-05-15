import { useEffect } from 'react';
import { usePostStore } from '../context/postStore';
import axiosClient from '../api/axiosClient';
import { PostItem } from '../components/PostItem';
import { Navbar } from '../components/Navbar';

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
    <div>
      <Navbar />
      <h2>Publicaciones</h2>
      {posts.map(post => <PostItem key={post.id} post={post} />)}
    </div>
  );
};
