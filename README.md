## Description

#### backend ip - http://localhost:3003/
#### docs - http://localhost:3003/api

### Фронт должен быть на одном из следующих адресов:
#### http://localhost:3001
#### http://localhost:3002
#### http://localhost:8080

## Project setup

```bash
bun install
```

#### Для призмы необходимо прописать:

```bash
bun prisma generate
bun prisma db push
```

## Содержимое .env файла:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
```