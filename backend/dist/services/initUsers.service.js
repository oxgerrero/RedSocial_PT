"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeUsersPasswords = void 0;
const client_1 = require("../prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const initializeUsersPasswords = async () => {
    try {
        console.log('🔐 Inicializando contraseñas de usuarios existentes...');
        const users = await client_1.prisma.user.findMany();
        const passwordHash = await bcryptjs_1.default.hash('Contraseña1.', 10); // contraseña genérica
        for (const user of users) {
            await client_1.prisma.user.update({
                where: { id: user.id },
                data: { password: passwordHash },
            });
        }
        console.log('✅ Contraseñas inicializadas exitosamente.');
    }
    catch (error) {
        console.error('Error inicializando contraseñas:', error);
    }
};
exports.initializeUsersPasswords = initializeUsersPasswords;
