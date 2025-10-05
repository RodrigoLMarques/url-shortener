import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from './modules/env/env.module';
import { EnvService } from './modules/env/env.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EnvModule,
    MikroOrmModule.forRootAsync({
      useFactory: async (envService: EnvService) => ({
        entities: ['./dist/entities'],
        entitiesTs: ['./src/entities'],
        dbName: envService.get('POSTGRES_DB'),
      }),
      imports: [EnvModule],
      inject: [EnvService],
      driver: PostgreSqlDriver,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
