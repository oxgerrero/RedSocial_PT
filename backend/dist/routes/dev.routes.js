"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devRouter = void 0;
const express_1 = require("express");
const initUsers_service_1 = require("../services/initUsers.service");
exports.devRouter = (0, express_1.Router)();
// Ruta temporal solo para inicializar claves
exports.devRouter.post('/init-passwords', async (_req, res) => {
    await (0, initUsers_service_1.initializeUsersPasswords)();
    res.json({ message: 'Passwords initialized successfully.' });
});
