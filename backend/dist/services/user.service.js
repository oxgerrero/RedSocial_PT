"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = void 0;
const client_1 = require("../prisma/client");
const getUserProfile = async (req, res) => {
    const userId = req.userId;
    const user = await client_1.prisma.user.findUnique({
        where: { id: userId },
        select: {
            nombre: true,
            apellido: true,
            alias: true,
            fecha_nacimiento: true,
            email: true,
        },
    });
    res.json(user);
};
exports.getUserProfile = getUserProfile;
