import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/',
  migrations: {
    path: 'prisma/migrations',
  },
  // Generation and validation can run before a database is configured.
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
});
