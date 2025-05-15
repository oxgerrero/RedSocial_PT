import rateLimit from 'express-rate-limit';

// Límite general para todas las rutas (opcional)
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máx 100 requests por IP
  message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.',
});

// Límite específico para rutas sensibles (login, register)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 intentos
  message: 'Demasiados intentos, espera unos minutos e inténtalo de nuevo.',
});
