# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar solo package.json y pnpm-lock.yaml primero (para aprovechar la cache)
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN npm install -g pnpm && pnpm install

# Copiar el resto del código fuente
COPY . .

# Build de producción
RUN pnpm build

# Etapa 2: Imagen final - Servidor para servir estáticos
FROM nginx:stable-alpine

# Copiar el build generado a la carpeta de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto que Nginx va a servir
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
