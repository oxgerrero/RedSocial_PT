"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const auth_service_1 = require("../services/auth.service");
// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await (0, auth_service_1.loginUser)(email, password);
        res.status(200).json({ token });
    }
    catch (error) {
        console.error('Login error:', error.message);
        res.status(400).json({ message: error.message });
    }
};
exports.login = login;
// Register Controller
const register = async (req, res) => {
    try {
        const { nombre, apellido, alias, fecha_nacimiento, email, password } = req.body;
        const token = await (0, auth_service_1.registerUser)(nombre, apellido, alias, new Date(fecha_nacimiento), email, password);
        res.status(201).json({ token });
    }
    catch (error) {
        console.error('Register error:', error.message);
        res.status(400).json({ message: error.message });
    }
};
exports.register = register;
