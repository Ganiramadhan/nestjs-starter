# 🚀 NestJS Starter - Clean Architecture & Microservices Ready

A modern NestJS starter boilerplate built with best practices in mind. Ideal for scalable backend applications with support for microservices, Swagger documentation, and developer tooling.

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
- **JWT** - JSON Web Token for authentication
- **Swagger** - API documentation
- **Husky** + **Lint-Staged** - Git hooks for code quality
- **Dotenv** - Environment configuration

---

## 📁 Folder Structure Highlights

```
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
```

---

## ⚙️ Environment Setup

### Create `.env` File

```env
# Server
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
```

---

## 🚀 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/Ganiramadhan/nestjs-starter.git
cd nestjs-starter
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Setup Git Hooks (Husky)

```bash
yarn prepare
```

### 4. Run the App (Development Mode)

```bash
yarn start:auth-api:dev
yarn start:product-api:dev
```

### 5. Access Swagger Documentation

- [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🔌 Microservices Ready

The project supports **NestJS microservices** (e.g., TCP, Redis, NATS, etc.).  
Example microservice bootstrap (`main.ts`):

```ts
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
```

---

## ✅ Scripts

| Command                      | Description                        |
|------------------------------|------------------------------------|
| `yarn start:auth-api:dev`     | Run `auth-api` in development mode |
| `yarn start:product-api:dev`  | Run `product-api` in development mode |
| `yarn start:auth-api:prod`    | Run `auth-api` in production mode  |
| `yarn start:product-api:prod` | Run `product-api` in production mode |
| `yarn build`                  | Build for production               |
| `yarn format`                 | Format code using Prettier         |
| `yarn lint`                   | Run ESLint                         |
| `yarn prepare`                | Setup Husky Git hooks              |

---

## 📦 Git Hooks

This starter uses **Husky** + **Lint-Staged** to enforce code quality:

- ✅ Auto-format staged files
- ✅ Prevent committing unformatted code

```json
// package.json
"lint-staged": {
  "*.ts": ["eslint --fix", "prettier --write"]
}
```

---

## 📄 License

MIT © 2025 NestJS Starter
