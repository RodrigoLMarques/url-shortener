import { Module } from '@nestjs/common';
import { MikroOrmUrlMetadataRepository } from './repositories/mikro-orm/mikro-orm-url-metadata.repository';
import { URL_METADATA_REPOSITORY } from './repositories/url-metadata.interface';
import { UrlMetadataService } from './services/url-metadata.service';

@Module({
  providers: [
    UrlMetadataService,
    {
      provide: URL_METADATA_REPOSITORY,
      useClass: MikroOrmUrlMetadataRepository,
    },
  ],
  exports: [UrlMetadataService],
})
export class UrlMetadataModule {}
