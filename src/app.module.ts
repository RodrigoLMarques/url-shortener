import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import config from './config/mikro-orm.config';
import { EnvModule } from './modules/env/env.module';
import { UrlModule } from './modules/urls/urls.module';
import { UrlClicksModule } from './modules/url-clicks/url-clicks.module';

@Module({
  imports: [
    EnvModule,
    MikroOrmModule.forRoot(config),
    UrlModule,
    ThrottlerModule.forRoot({
      throttlers: [{ name: 'default', ttl: 1000, limit: 4 }],
    }),
    UrlClicksModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
