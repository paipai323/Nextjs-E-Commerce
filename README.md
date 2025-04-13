# Next.js E-Commerce Practice Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 📦 Tech Stack

- [Next.js](https://nextjs.org) – App Router, TypeScript
- [React](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com) – Styling
- [PostgreSQL](https://www.postgresql.org) – Relational database
- [Docker](https://www.docker.com) – Containerized PostgreSQL environment
- **Pure SQL** – No ORM, raw SQL queries to practice advanced skills

## 🛠️ Overview

This is a **work-in-progress e-commerce project**, built mainly to:

- Practice full-stack development using modern frameworks and tools
- Improve advanced SQL knowledge by working without ORMs
- Explore scalable patterns for building database-driven applications

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/nextjs-ecommerce-practice.git
cd nextjs-ecommerce-practice
```

### 2. Start the PostgreSQL container
Make sure you have Docker installed. Then run:
```bash
docker-compose up -d
```

### 3. Install dependencies
```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

### 4. Set up the database
Once PostgreSQL is running, you can apply the schema and seed data manually using
```bash
npm run migrate
# or
yarn migrate
# or
pnpm migrate
# or
bun run migrate
```

### 5. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```








