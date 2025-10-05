import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from 'src/config/env';
import { EnvService } from './env.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      envFilePath: '.env',
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
