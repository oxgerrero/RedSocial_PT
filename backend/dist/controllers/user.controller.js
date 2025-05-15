"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.changePassword = exports.getProfile = void 0;
const client_1 = require("../prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getProfile = async (req, res) => {
    try {
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
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getProfile = getProfile;
const changePassword = async (req, res) => {
    try {
        const userId = req.userId;
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Debes enviar contraseña actual y nueva.' });
        }
        const user = await client_1.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        const isValidPassword = await bcryptjs_1.default.compare(oldPassword, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Contraseña actual incorrecta.' });
        }
        const hashedNewPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await client_1.prisma.user.update({
            where: { id: userId },
            data: { password: hashedNewPassword },
        });
        res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });
    }
    catch (error) {
        console.error('Error cambiando contraseña:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};
exports.changePassword = changePassword;
const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { nombre, apellido, alias, fecha_nacimiento } = req.body;
        if (!nombre || !apellido || !alias || !fecha_nacimiento) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios para actualizar perfil.' });
        }
        // Validar si el alias ya está en uso por otro usuario
        const existingAlias = await client_1.prisma.user.findFirst({
            where: {
                alias,
                NOT: { id: userId }
            }
        });
        if (existingAlias) {
            return res.status(409).json({ message: 'El alias ya está en uso por otro usuario.' });
        }
        await client_1.prisma.user.update({
            where: { id: userId },
            data: {
                nombre,
                apellido,
                alias,
                fecha_nacimiento: new Date(fecha_nacimiento),
            },
        });
        res.status(200).json({ message: 'Perfil actualizado exitosamente.' });
    }
    catch (error) {
        console.error('Error actualizando perfil:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};
exports.updateProfile = updateProfile;
