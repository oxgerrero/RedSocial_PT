"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repostPost = exports.commentOnPost = exports.reactToPost = exports.listPosts = exports.createPost = void 0;
const client_1 = require("../prisma/client");
const createPost = async (req, res) => {
    try {
        const { contenido } = req.body;
        const userId = req.userId;
        const post = await client_1.prisma.post.create({
            data: { contenido, fecha_publicacion: new Date(), userId },
        });
        res.status(201).json(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createPost = createPost;
const listPosts = async (_req, res) => {
    try {
        const posts = await client_1.prisma.post.findMany({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.listPosts = listPosts;
const reactToPost = async (req, res) => {
    try {
        const { postId, type } = req.body;
        const userId = req.userId;
        const reaction = await client_1.prisma.reaction.create({
            data: { postId, userId, type },
        });
        res.status(201).json(reaction);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.reactToPost = reactToPost;
const commentOnPost = async (req, res) => {
    try {
        const { postId, content } = req.body;
        const userId = req.userId;
        const comment = await client_1.prisma.comment.create({
            data: { postId, userId, content },
        });
        res.status(201).json(comment);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.commentOnPost = commentOnPost;
const repostPost = async (req, res) => {
    try {
        const { originalPostId } = req.body;
        const userId = req.userId;
        const repost = await client_1.prisma.repost.create({
            data: { originalPostId, userId },
        });
        res.status(201).json(repost);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.repostPost = repostPost;
