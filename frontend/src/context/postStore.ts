import { create } from 'zustand';

interface Reaction {
  id: number;
  type: string;
  userId: number;
}

interface Comment {
  id: number;
  content: string;
  userId: number;
  user: { alias: string };
}

interface Repost {
  id: number;
  userId: number;
}

interface Post {
  id: number;
  contenido: string;
  fecha_publicacion: string;
  user: { alias: string };
  reactions: Reaction[];
  comments: Comment[];
  reposts: Repost[];
}

interface PostState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}

export const usePostStore = create<PostState>(set => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
}));
