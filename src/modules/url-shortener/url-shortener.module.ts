import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UrlModel } from 'src/entities/urls';
import { UrlShortenerController } from './controller/url-shortener.controller';
import { MikroOrmUrlRepository } from './repositories/mikro-orm/mikro-orm-url.repository';
import { URL_REPOSITORY } from './repositories/url-repository';
import { UrlShortenerService } from './services/url-shortener.service';

@Module({
  imports: [MikroOrmModule.forFeature([UrlModel])],
  controllers: [UrlShortenerController],
  providers: [
    UrlShortenerService,
    {
      provide: URL_REPOSITORY,
      useClass: MikroOrmUrlRepository,
    },
  ],
})
export class UrlShortenerModule {}
