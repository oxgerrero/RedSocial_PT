"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLimiter = exports.generalLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Límite general para todas las rutas (opcional)
exports.generalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máx 100 requests por IP
    message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.',
});
// Límite específico para rutas sensibles (login, register)
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // máximo 5 intentos
    message: 'Demasiados intentos, espera unos minutos e inténtalo de nuevo.',
});
