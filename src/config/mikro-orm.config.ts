import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env', quiet: true });

const config: Options<PostgreSqlDriver> = {
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  host: process.env.POSTGRES_HOST,
  dbName: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  driver: PostgreSqlDriver,
};

export default config;
