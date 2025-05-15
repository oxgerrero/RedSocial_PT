# 📚 RedSocial\_PT - Sistema Completo Fullstack

Proyecto Fullstack de red social estilo Instagram con autenticación JWT, publicaciones, reacciones, comentarios, reposts, y gestión de perfil.

Este repositorio contiene:

* **Frontend:** React + Vite + TailwindCSS
* **Backend:** Node.js + Express + Prisma ORM
* **Base de Datos:** PostgreSQL
* **Contenedores:** Docker y Docker Compose

---

## 🛠️ Tecnologías principales

| Stack         | Tecnologías                                   |
| :------------ | :-------------------------------------------- |
| Frontend      | React 19, Vite, TailwindCSS 4, Zustand, Toast |
| Backend       | Node.js 22, Express, Prisma ORM, JWT          |
| Base de Datos | PostgreSQL 14                                 |
| Contenedores  | Docker, Docker Compose                        |
| Testing       | Vitest, Supertest                             |

---

# 📦 Requerimientos previos

* Node.js v22.15.1
* npm v11.3.0
* pnpm instalado (`npm install -g pnpm`)
* Docker y Docker Compose instalados
* PostgreSQL corriendo (local o Docker)

---

# 🚀 Instalación y configuración

## 🔹 Backend (API REST)

1. **Clonar repositorio**

```bash
git clone https://github.com/oxgerrero/RedSocial_PT.git
cd RedSocial_PT/backend
```

2. **Instalar dependencias**

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm install -D ts-node
```

3. **Configurar entorno**

Copia `.env.example` a `.env` y modifica:

```env
DATABASE_URL="postgresql://postgres:tu_password@localhost:5432/red_social_db"
JWT_SECRET="clave_secreta_segura"
```

4. **Inicializar Base de Datos**

```bash
pnpm prisma generate
pnpm prisma migrate dev --name init_schema
pnpm prisma migrate reset
pnpm prisma:seed
```

5. **Iniciar servidor**

```bash
pnpm dev
```

Servidor corriendo en `http://localhost:3000`

6. **Inicializar contraseñas (solo en desarrollo)**

```bash
curl -X POST http://localhost:3000/api/dev/init-passwords
```

---

## 🔹 Frontend (Cliente Web)

1. **Instalar Frontend**

```bash
cd ../frontend
pnpm install
```

2. **Configurar entorno**

Copia `.env.example` a `.env` y modifica:

```env
VITE_API_URL=http://localhost:3000
```

3. **Levantar frontend**

```bash
pnpm dev
```

Frontend disponible en `http://localhost:5173`

---

## 🔹 Base de Datos

Si deseas usar Docker para la base de datos:

```bash
docker run --name red_social_db -e POSTGRES_PASSWORD=admin123 -p 5432:5432 -d postgres:14
```

Crear base de datos para testing manualmente:

```bash
docker exec -it red_social_db psql -U postgres
CREATE DATABASE red_social_test_db;
```

---

# 🐳 Uso con Docker Compose (Backend + Base de Datos)

1. **Ejecutar servicios**

```bash
cd backend
docker-compose build
docker-compose up -d
```

2. **Apagar servicios**

```bash
docker-compose down
```

---

# 📄 Documentación de la API

Una vez corriendo el backend, accede a Swagger UI:

```bash
http://localhost:3000/api-docs
```

---

# 🧪 Testing (Backend)

Correr todos los tests unitarios:

```bash
pnpm run test
```

> Usa Vitest + Supertest + Prisma en entorno aislado `red_social_test_db`.

---

# 📚 Estructura general de carpetas

```plaintext
RedSocial_PT/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.ts
│   ├── prisma/
│   ├── tests/
│   ├── docker-compose.yml
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── api/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── bd
|   ├── datosPrueba.sql
|   └── script.sql
├── docker-compose.yml
└── README.md
```

---

# 🛡️ Seguridad implementada

* Hashing de contraseñas con bcrypt.
* JWT tokens seguros.
* Validaciones en servidor (express-validator).
* Protecciones básicas (Helmet, CORS).
* Variables de entorno externas.

---

# 👨‍💻 Autor

* **David Gomez**
* [GitHub](https://github.com/oxgerrero)