import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { usePostStore } from '../context/postStore';

interface PostProps {
  post: any;
}

export const PostItem = ({ post }: PostProps) => {
  const { setPosts } = usePostStore();
  const [comment, setComment] = useState('');

  const refreshPosts = async () => {
    const { data } = await axiosClient.get('/posts');
    setPosts(data);
  };

  const handleReact = async (type: string) => {
    await axiosClient.post('/posts/react', { postId: post.id, type });
    refreshPosts();
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    await axiosClient.post('/posts/comment', { postId: post.id, content: comment });
    setComment('');
    refreshPosts();
  };

  const handleRepost = async () => {
    await axiosClient.post('/posts/repost', { originalPostId: post.id });
    refreshPosts();
  };

  return (
    <div className="post">
      <h3>{post.user.alias}</h3>
      <p>{post.contenido}</p>
      <div>
        <button onClick={() => handleReact('like')}>👍</button>
        <button onClick={() => handleReact('love')}>❤️</button>
        <button onClick={() => handleReact('laugh')}>😂</button>
        <button onClick={() => handleReact('wow')}>😮</button>
        <button onClick={() => handleReact('sad')}>😢</button>
        <button onClick={() => handleReact('angry')}>😡</button>
        <button onClick={handleRepost}>🔁 Repost</button>
      </div>
      <div>
        <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Comentario..." />
        <button onClick={handleComment}>Comentar</button>
      </div>
      <div>
        {post.comments.map((c: any) => (
          <p key={c.id}><strong>{c.user.alias}:</strong> {c.content}</p>
        ))}
      </div>
    </div>
  );
};
