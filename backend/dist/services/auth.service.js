"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const client_1 = require("../prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../utils/generateToken");
const validator_1 = __importDefault(require("validator"));
const loginUser = async (email, password) => {
    const user = await client_1.prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new Error('Usuario no encontrado.');
    const validPassword = await bcryptjs_1.default.compare(password, user.password);
    if (!validPassword)
        throw new Error('Credenciales incorrectas.');
    const token = (0, generateToken_1.generateToken)(user.id);
    return token;
};
exports.loginUser = loginUser;
const registerUser = async (nombre, apellido, alias, fecha_nacimiento, email, password) => {
    if (!validator_1.default.isEmail(email)) {
        throw new Error('Email inválido.');
    }
    if (!validator_1.default.isAlphanumeric(alias)) {
        throw new Error('Alias debe ser solo letras o números.');
    }
    if (nombre.length < 2 || apellido.length < 2) {
        throw new Error('Nombre y apellido deben tener mínimo 2 caracteres.');
    }
    const existingUser = await client_1.prisma.user.findFirst({
        where: { OR: [{ email }, { alias }] }
    });
    if (existingUser)
        throw new Error('Email o alias ya en uso.');
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await client_1.prisma.user.create({
        data: {
            nombre,
            apellido,
            alias,
            fecha_nacimiento,
            email,
            password: hashedPassword
        }
    });
    const token = (0, generateToken_1.generateToken)(user.id);
    return token;
};
exports.registerUser = registerUser;
