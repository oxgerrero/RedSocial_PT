import { useState } from 'react';
import { motion } from 'framer-motion';
import axiosClient from '../api/axiosClient';
import { usePostStore } from '../context/postStore';

interface PostProps {
  post: {
    id: number;
    contenido: string;
    fecha_publicacion: string;
    user: { alias: string };
    reactions: { id: number; type: string; userId: number }[];
    comments: { id: number; content: string; user: { alias: string } }[];
    reposts: { id: number }[];
    postImage?: string;
  };
}

export const PostCard = ({ post }: PostProps) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showReactionOptions, setShowReactionOptions] = useState(false);
  const { setPosts } = usePostStore();

  const fetchPosts = async () => {
    const { data } = await axiosClient.get('/posts');
    setPosts(data);
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    await axiosClient.post('/posts/comment', {
      postId: post.id,
      content: commentText,
    });

    setCommentText('');
    setShowCommentInput(false);
    fetchPosts();
  };

  const handleReaction = async (reactionType: string) => {
    await axiosClient.post('/posts/react', {
      postId: post.id,
      type: reactionType,
    });

    setShowReactionOptions(false);
    fetchPosts();
  };

  const handleRepost = async () => {
    await axiosClient.post('/posts/repost', {
      originalPostId: post.id,
    });
    try {
      await axiosClient.post('/posts', {
        contenido: `🔁 Repost de @${post.user.alias}: ${post.contenido}`,
      });
    } catch (error) {
      console.error('Error repostando:', error);
    }
    fetchPosts();
  };

  const reactionCount = post.reactions.length;
  const commentCount = post.comments.length;
  const repostCount = post.reposts.length;

  const formattedDate = new Date(post.fecha_publicacion).toLocaleDateString();

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-5 mb-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        {/* 
        <img
          src="https://i.pravatar.cc/40"
          alt="perfil"
          className="w-10 h-10 rounded-full mr-3"
        />
        */}
        <div>
          <h4 className="font-bold text-gray-800">{post.user.alias}</h4>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
      </div>

      {/* Contenido */}
      <p className="mb-4 text-gray-700">{post.contenido}</p>

      {post.postImage && (
        <img
          src={post.postImage}
          alt="Imagen del post"
          className="rounded-lg mb-4 w-full h-auto object-cover"
        />
      )}

      {/* Acciones */}
      <div className="flex justify-between items-center text-gray-600 text-sm mb-4">
        
        {/* Botón + Reacciones */}
        <div className="relative inline-block group">
          {/* Botón principal */}
          <button className="hover:text-blue-500">
            ❤️ Reaccionar ({reactionCount})
          </button>

          {/* Menú de emojis */}
          <div className="absolute top-full left-0 bg-white rounded-lg shadow-lg p-2 flex flex-row gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {[
              { emoji: '👍', type: 'like' },
              { emoji: '❤️', type: 'love' },
              { emoji: '😂', type: 'laugh' },
              { emoji: '😮', type: 'wow' },
              { emoji: '😢', type: 'sad' },
              { emoji: '😡', type: 'angry' },
            ].map(({ emoji, type }, index) => (
              <motion.button
                key={type}
                className="hover:bg-blue-100 rounded-full p-2 text-2xl"
                onClick={() => handleReaction(type)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Botón Comentar */}
        <button
          className="hover:text-blue-500"
          onClick={() => setShowCommentInput(!showCommentInput)}
        >
          💬 Comentar ({commentCount})
        </button>

        {/* Botón Repost */}
        <button
          className="hover:text-blue-500"
          onClick={handleRepost}
        >
          🔁 Repostear ({repostCount})
        </button>

      </div>

      {/* Input para comentar */}
      {showCommentInput && (
        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            className="w-full border rounded-full px-4 py-2 text-sm"
            placeholder="Escribe un comentario..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            className="text-blue-500 font-semibold"
            onClick={handleAddComment}
          >
            Enviar
          </button>
        </div>
      )}

      {/* Comentarios */}
      <div className="mt-4">
        <h5 className="text-sm font-semibold mb-2 text-gray-800">Comentarios:</h5>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-2">
              {/*
              <img
                src="https://i.pravatar.cc/30"
                alt="comment user"
                className="w-8 h-8 rounded-full"
              />
              */}
              <div className="bg-gray-100 p-2 rounded-lg">
                <p className="text-sm">
                  <span className="font-bold">{comment.user.alias}</span> {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
