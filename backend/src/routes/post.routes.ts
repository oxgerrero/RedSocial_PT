import { Router } from 'express';
import { createPost, listPosts, reactToPost, commentOnPost, repostPost } from '../services/post.service';
import { verifyToken } from '../middlewares/auth.middleware';

export const postRouter = Router();

postRouter.use(verifyToken);

postRouter.get('/', listPosts);
postRouter.post('/', createPost);
postRouter.post('/react', reactToPost);
postRouter.post('/comment', commentOnPost);
postRouter.post('/repost', repostPost);
