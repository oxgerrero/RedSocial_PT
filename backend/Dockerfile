# Backend Dockerfile
FROM node:22

WORKDIR /app

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY package.json ./
#COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm prisma generate

EXPOSE 3000


CMD ["sh", "-c", "/wait-for-it.sh database && pnpm prisma migrate deploy && pnpm dev"]