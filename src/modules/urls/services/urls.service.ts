import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUrlDto } from '../models/urls.dto';
import { UrlEntity } from '../models/urls.entity';
import { URL_REPOSITORY, UrlRepository } from '../repositories/url.repository';

@Injectable()
export class UrlService {
  constructor(
    @Inject(URL_REPOSITORY)
    private readonly repository: UrlRepository,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async create(dto: CreateUrlDto): Promise<UrlEntity> {
    const { originalUrl } = dto;
    const url = UrlEntity.create({ originalUrl });
    await this.repository.create(url);
    return url;
  }

  async findByAlias(alias: string): Promise<UrlEntity> {
    const cached = await this.cacheManager.get<ReturnType<UrlEntity['toJSON']>>(
      `alias:${alias}`,
    );
    if (cached) return UrlEntity.fromJSON(cached);

    const url = await this.repository.findByAlias(alias);
    if (!url) throw new BadRequestException();

    await this.cacheManager.set(`alias:${alias}`, url.toJSON(), 3600);

    return url;
  }

  async redirect(alias: string): Promise<UrlEntity> {
    const url = await this.findByAlias(alias);
    url.incrementClick();
    this.repository.save(url);
    return url;
  }
}
