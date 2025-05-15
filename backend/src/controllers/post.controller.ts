import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { contenido } = req.body;
    const userId = req.userId!;
    const post = await prisma.post.create({
      data: { contenido, fecha_publicacion: new Date(), userId },
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const listPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: { select: { alias: true } },
        reactions: true,
        comments: {
          include: { user: { select: { alias: true } } },
        },
        reposts: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const reactToPost = async (req: Request, res: Response) => {
  try {
    const { postId, type } = req.body;
    const userId = req.userId!;
    const reaction = await prisma.reaction.create({
      data: { postId, userId, type },
    });
    res.status(201).json(reaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const commentOnPost = async (req: Request, res: Response) => {
  try {
    const { postId, content } = req.body;
    const userId = req.userId!;
    const comment = await prisma.comment.create({
      data: { postId, userId, content },
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const repostPost = async (req: Request, res: Response) => {
  try {
    const { originalPostId } = req.body;
    const userId = req.userId!;
    const repost = await prisma.repost.create({
      data: { originalPostId, userId },
    });
    res.status(201).json(repost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
