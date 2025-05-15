import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export const createPost = async (req: Request, res: Response) => {
  const { contenido } = req.body;
  const userId = req.userId!;
  const post = await prisma.post.create({
    data: { contenido, fecha_publicacion: new Date(), userId },
  });
  res.json(post);
};

export const listPosts = async (_req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    include: {
      user: { select: { alias: true } },
      reactions: true,
      comments: {
        include: {
          user: { select: { alias: true } }, // 🔥 muy importante
        },
      },
      reposts: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json(posts);
};

export const reactToPost = async (req: Request, res: Response) => {
  const { postId, type } = req.body;
  const userId = req.userId!;
  const reaction = await prisma.reaction.create({
    data: { postId, userId, type },
  });
  res.json(reaction);
};

export const commentOnPost = async (req: Request, res: Response) => {
  const { postId, content } = req.body;
  const userId = req.userId!;
  const comment = await prisma.comment.create({
    data: { postId, userId, content },
  });
  res.json(comment);
};

export const repostPost = async (req: Request, res: Response) => {
  const { originalPostId } = req.body;
  const userId = req.userId!;
  const repost = await prisma.repost.create({
    data: { originalPostId, userId },
  });
  res.json(repost);
};
