import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['test', 'development', 'production']),
  DATABASE_URL: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  REDIS_PASSWORD: z.string(),
});

export type Env = z.infer<typeof envSchema>;
