import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClickData } from 'src/modules/url-clicks/models/url-click.dto';
import { UrlClicksService } from 'src/modules/url-clicks/services/url-clicks.service';
import { CreateUrlDto } from '../models/url.dto';
import { UrlEntity } from '../models/url.entity';
import {
  URL_REPOSITORY,
  type IUrlRepository,
} from '../repositories/url-repository.interface';

type UrlJson = ReturnType<UrlEntity['toJSON']>;

@Injectable()
export class UrlService {
  constructor(
    @Inject(URL_REPOSITORY)
    private readonly repository: IUrlRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly urlClicksService: UrlClicksService,
  ) {}

  async create(dto: CreateUrlDto): Promise<UrlEntity> {
    const { originalUrl } = dto;
    const url = UrlEntity.create({ originalUrl });
    await this.repository.create(url);
    return url;
  }

  async redirect(alias: string, clickData: ClickData): Promise<UrlEntity> {
    const url = await this.getByAlias(alias);
    await this.urlClicksService.create({ urlId: url.id, clickData });
    return url;
  }

  async getByAlias(alias: string): Promise<UrlEntity> {
    const cached = await this.getCachedUrl(alias);
    if (cached) return cached;

    const url = await this.repository.getByAlias(alias);
    if (!url) throw new NotFoundException('URL not found');
    url.clickCount = await this.urlClicksService.count(url.id);

    await this.cacheUrl(alias, url);
    return url;
  }

  private async getCachedUrl(alias: string): Promise<UrlEntity | null> {
    const cached = await this.cacheManager.get<UrlJson>(`alias:${alias}`);
    return cached ? UrlEntity.fromJSON(cached) : null;
  }

  private async cacheUrl(alias: string, url: UrlEntity): Promise<void> {
    await this.cacheManager.set(`alias:${alias}`, url.toJSON(), 3600);
  }
}
