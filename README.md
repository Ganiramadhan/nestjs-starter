# 🚀 NestJS Starter - Clean Architecture & Microservices Ready

A modern NestJS starter boilerplate built with best practices in mind. Ideal for scalable backend applications with support for microservices, Swagger docs, and developer tooling.

---

## ✨ Features

- ✅ Structured environment variables
- ✅ Swagger API documentation
- ✅ Short/alias import paths (`@/`)
- ✅ Pre-commit checks using **Husky** + **Lint-Staged**
- ✅ Microservices-ready architecture
- ✅ Auth module with JWT
- ✅ Scalable modular folder structure

---

## 🛠️ Tech Stack

- **NestJS** - Scalable Node.js framework
- **TypeORM** - ORM for PostgreSQL
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Token for Auth
- **Swagger** - API documentation
- **Husky** + **Lint-Staged** - Git hooks for code quality
- **Dotenv** - Environment config

---

## 📁 Folder Structure Highlights

\`\`\`bash
apps/
├── auth-api/
│   └── src/
│       ├── common/
│       ├── config/
│       ├── dto/
│       ├── entities/
│       ├── shared/
│       ├── main.ts
│       ├── auth-api.controller.ts
│       ├── auth-api.service.ts
│       └── auth-api.module.ts
├── product-api/
│   └── src/
│       ├── common/
│       ├── config/
│       ├── dto/
│       ├── entities/
│       ├── shared/
│       ├── main.ts
│       ├── product-api.controller.ts
│       ├── product-api.service.ts
│       └── product-api.module.ts
\`\`\`

---

## ⚙️ Environment Setup

### Create `.env` file

\`\`\`env
# .env
PORT=3000

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600s

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=nestjs_db
\`\`\`

---

## 🚀 Installation Guide

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/Ganiramadhan/nestjs-starter.git
cd aqua-vision-core
\`\`\`

### 2. Install Dependencies

\`\`\`bash
yarn install
\`\`\`

### 3. Setup Git Hooks (Husky)

\`\`\`bash
yarn prepare
\`\`\`

### 4. Run the App (Dev Mode)

\`\`\`bash
yarn start:auth-api:dev
yarn start:product-api:dev
\`\`\`

### 5. Access Swagger Docs

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🔌 Microservices Ready

The project is structured to support **NestJS microservices** (e.g. via TCP, Redis, NATS, etc.).
Example microservice entry point (in \`main.ts\`):

\`\`\`ts
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 8877,
    },
  });
  await app.listen();
}
\`\`\`

---

## ✅ Scripts

| Command                    | Deskripsi                        |
|----------------------------|----------------------------------|
| \`yarn start:auth-api:dev\`     | Jalankan `auth-api` dalam mode dev |
| \`yarn start:product-api:dev\`  | Jalankan `product-api` dalam mode dev |
| \`yarn start:auth-api:prod\`    | Jalankan `auth-api` dalam mode prod |
| \`yarn start:product-api:prod\` | Jalankan `product-api` dalam mode prod |
| \`yarn build\`               | Build untuk production          |
| \`yarn format\`              | Format dengan Prettier          |
| \`yarn lint\`                | Jalankan ESLint                 |
| \`yarn prepare\`             | Setup hook Husky                |

---

## 📦 Git Hooks

This starter uses **Husky** + **Lint-Staged** to enforce quality:

- ✅ Auto-format staged files
- ✅ Prevent bad commits

\`\`\`json
// package.json
"lint-staged": {
  "*.ts": ["eslint --fix", "prettier --write"]
}
\`\`\`


---

## 📄 License

MIT © 2025 NestJS Starter
