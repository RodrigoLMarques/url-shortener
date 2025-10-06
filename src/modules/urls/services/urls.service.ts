import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EnvService } from 'src/modules/env/env.service';
import { CreateUrlDto } from '../models/create-url.dto';
import { UrlEntity } from '../models/url.entity';
import type { IUrlRepository } from '../repositories/url-repository.interface';
import { URL_REPOSITORY } from '../repositories/url-repository.interface';

@Injectable()
export class UrlService {
  private protocol: string;
  private domain: string;

  constructor(
    @Inject(URL_REPOSITORY)
    private readonly repository: IUrlRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly envService: EnvService,
  ) {
    this.protocol = this.envService.get('APP_PROTOCOL');
    this.domain = this.envService.get('APP_DOMAIN');
  }

  async create(dto: CreateUrlDto): Promise<UrlEntity> {
    const { originalUrl } = dto;
    const url = UrlEntity.create({
      originalUrl,
      domain: this.domain,
      protocol: this.protocol,
    });
    await this.repository.create(url);
    return url;
  }

  async findByAlias(alias: string): Promise<UrlEntity> {
    const cached = await this.cacheManager.get<ReturnType<UrlEntity['toJSON']>>(
      `alias:${alias}`,
    );
    if (cached) return UrlEntity.fromJSON(cached);

    const url = await this.repository.findByAlias(alias);
    if (!url) throw new NotFoundException('URL not found');

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
