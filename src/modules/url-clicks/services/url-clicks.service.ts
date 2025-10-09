import { Inject, Injectable } from '@nestjs/common';
import { CreateUrlClickDto } from '../models/url-click.dto';
import { UrlClickEntity } from '../models/url-click.entity';
import {
  URL_CLICK_REPOSITORY,
  type IUrlClickRepository,
} from '../repositories/url-repository.interface';
import { ClickEnrichmentService } from './click-enrichment.service';

@Injectable()
export class UrlClicksService {
  constructor(
    @Inject(URL_CLICK_REPOSITORY)
    private readonly repository: IUrlClickRepository,
    private readonly clickEnrichmentService: ClickEnrichmentService,
  ) {}

  async create(dto: CreateUrlClickDto): Promise<UrlClickEntity> {
    const { urlId, clickData } = dto;

    const enrichment = this.clickEnrichmentService.enrich(
      clickData.ipAddress,
      clickData.userAgent,
    );

    const click = UrlClickEntity.create({
      urlId,
      ...clickData,
      ...enrichment,
    });

    await this.repository.create(click);

    return click;
  }

  async count(urlId: string): Promise<number> {
    const clickCount = await this.repository.count(urlId);
    return clickCount;
  }
}
