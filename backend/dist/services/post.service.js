"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repostPost = exports.commentOnPost = exports.reactToPost = exports.listPosts = exports.createPost = void 0;
const client_1 = require("../prisma/client");
const createPost = async (req, res) => {
    const { contenido } = req.body;
    const userId = req.userId;
    const post = await client_1.prisma.post.create({
        data: { contenido, fecha_publicacion: new Date(), userId },
    });
    res.json(post);
};
exports.createPost = createPost;
const listPosts = async (_req, res) => {
    const posts = await client_1.prisma.post.findMany({
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
exports.listPosts = listPosts;
const reactToPost = async (req, res) => {
    const { postId, type } = req.body;
    const userId = req.userId;
    const reaction = await client_1.prisma.reaction.create({
        data: { postId, userId, type },
    });
    res.json(reaction);
};
exports.reactToPost = reactToPost;
const commentOnPost = async (req, res) => {
    const { postId, content } = req.body;
    const userId = req.userId;
    const comment = await client_1.prisma.comment.create({
        data: { postId, userId, content },
    });
    res.json(comment);
};
exports.commentOnPost = commentOnPost;
const repostPost = async (req, res) => {
    const { originalPostId } = req.body;
    const userId = req.userId;
    const repost = await client_1.prisma.repost.create({
        data: { originalPostId, userId },
    });
    res.json(repost);
};
exports.repostPost = repostPost;
