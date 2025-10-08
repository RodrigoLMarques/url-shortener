import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUrlDto } from '../models/create-url.dto';
import { UrlEntity } from '../models/url.entity';
import type { IUrlRepository } from '../repositories/url-repository.interface';
import { URL_REPOSITORY } from '../repositories/url-repository.interface';

type UrlJson = ReturnType<UrlEntity['toJSON']>;

@Injectable()
export class UrlService {
  constructor(
    @Inject(URL_REPOSITORY)
    private readonly repository: IUrlRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateUrlDto): Promise<UrlEntity> {
    const { originalUrl } = dto;
    const url = UrlEntity.create({ originalUrl });
    await this.repository.create(url);
    return url;
  }

  async redirect(alias: string): Promise<UrlEntity> {
    const url = await this.getByAlias(alias);
    // TODO: count click
    return url;
  }

  async getByAlias(alias: string): Promise<UrlEntity> {
    const cached = await this.getCachedUrl(alias);
    if (cached) return cached;

    const url = await this.repository.getByAlias(alias);
    if (!url) throw new NotFoundException('URL not found');

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
