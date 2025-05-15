node -v v22.15.1
npm -v  11.3.0

pnpm prisma migrate reset

//borrar node_modules y pnpm-lock.yaml
pnpm install
pnpm install -D ts-node
pnpm prisma generate
pnpm prisma migrate dev --name init_schema
pnpm prisma migrate reset
pnpm prisma:seed

pnpm dev
curl -X POST http://localhost:3000/api/dev/init-passwords #esto es solo para la prueba, no exponer

docker-compose build
docker-compose up -d
docker-compose down
