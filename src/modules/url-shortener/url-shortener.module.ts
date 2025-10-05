import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UrlModel } from 'src/entities/urls';
import { UrlShortenerController } from './controller/url-shortener.controller';
import { UrlShortenerService } from './services/url-shortener.service';

@Module({
  imports: [MikroOrmModule.forFeature([UrlModel])],
  controllers: [UrlShortenerController],
  providers: [UrlShortenerService],
})
export class UrlShortenerModule {}
