import { Module } from '@nestjs/common';
import { MikroOrmUrlClickRepository } from './repositories/mikro-orm/mikro-orm-url.repository';
import { URL_CLICK_REPOSITORY } from './repositories/url-repository.interface';
import { ClickEnrichmentService } from './services/click-enrichment.service';
import { UrlClicksService } from './services/url-clicks.service';

@Module({
  providers: [
    UrlClicksService,
    ClickEnrichmentService,
    {
      provide: URL_CLICK_REPOSITORY,
      useClass: MikroOrmUrlClickRepository,
    },
  ],
  exports: [UrlClicksService],
})
export class UrlClicksModule {}
