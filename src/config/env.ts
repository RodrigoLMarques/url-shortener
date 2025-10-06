import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['test', 'development', 'production']),
  DATABASE_DB: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  REDIS_URL: z.string(),
  REDIS_PASSWORD: z.string(),
});

export type Env = z.infer<typeof envSchema>;
