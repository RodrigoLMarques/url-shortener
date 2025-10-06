import KeyvRedis, { Keyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { UrlController } from './controller/urls.controller';
import { MikroOrmUrlRepository } from './repositories/mikro-orm/mikro-orm-url.repository';
import { URL_REPOSITORY } from './repositories/url-repository.interface';
import { UrlService } from './services/urls.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => {
        const keyv = new Keyv({
          store: new KeyvRedis({
            url: envService.get('REDIS_URL'),
            password: envService.get('REDIS_PASSWORD'),
          }),
          ttl: 86400,
        });
        return { store: keyv };
      },
    }),
  ],
  controllers: [UrlController],
  providers: [
    UrlService,
    {
      provide: URL_REPOSITORY,
      useClass: MikroOrmUrlRepository,
    },
  ],
})
export class UrlModule {}
