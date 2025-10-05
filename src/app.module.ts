import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import config from './config/mikro-orm.config';
import { EnvModule } from './modules/env/env.module';
import { UrlShortenerModule } from './modules/url-shortener/url-shortener.module';

@Module({
  imports: [EnvModule, MikroOrmModule.forRoot(config), UrlShortenerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
