import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env', quiet: true });

const config: Options<PostgreSqlDriver> = {
  entities: ['./dist/database/entities'],
  entitiesTs: ['./src/database/entities'],
  migrations: {
    path: './dist/database/migrations',
    pathTs: './src/database/migrations',
    glob: '!(*.d).js',
  },
  host: process.env.DATABASE_HOST,
  dbName: process.env.DATABASE_DB,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  driver: PostgreSqlDriver,
};

export default config;
