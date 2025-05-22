## Barbershop salon Backend

Данное приложение является сервисом для управления барбершопом, используя REST API подход.

## Используемые технологии

- TypeScript
- Node.js
- Nest.js
- bun
- PostgreSQL
- Prisma ORM
- swagger
- prettier/eslint

## Запуск проекта

```bash
bun install
```

#### Инициализация prisma:

```bash
bun prisma generate
bun prisma db push
```

#### Содержимое .env файла:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
```


### CORS Policy
Сервер настроен с политикой CORS, разрешающей запросы со следующих фронтенд-адресов:
#### http://localhost:3001
#### http://localhost:3002
#### http://localhost:8080


### backend ip - http://localhost:3003/
### swagger docs - http://localhost:3003/api
