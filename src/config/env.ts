import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['test', 'development', 'production']),
  PORT: z.coerce.number().default(3000),
  APP_DOMAIN: z.string().default('localhost:3000'),
  APP_PROTOCOL: z.enum(['http', 'https']).default('http'),
  DATABASE_DB: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  REDIS_URL: z.string(),
  REDIS_PASSWORD: z.string(),
});

export type Env = z.infer<typeof envSchema>;
