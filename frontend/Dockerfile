# Frontend Dockerfile
FROM node:22

WORKDIR /app

COPY package.json ./
#COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev"]
