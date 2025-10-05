import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UrlModel } from 'src/entities/urls';
import { UrlController } from './controller/urls.controller';
import { MikroOrmUrlRepository } from './repositories/mikro-orm/mikro-orm-url.repository';
import { URL_REPOSITORY } from './repositories/url.repository';
import { UrlService } from './services/urls.service';

@Module({
  imports: [MikroOrmModule.forFeature([UrlModel])],
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
