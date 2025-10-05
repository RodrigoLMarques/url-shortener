import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUrlDto } from '../models/url-shortener.dto';
import { UrlEntity } from '../models/url-shortener.entity';
import { URL_REPOSITORY, UrlRepository } from '../repositories/url-repository';

@Injectable()
export class UrlShortenerService {
  constructor(
    @Inject(URL_REPOSITORY)
    private readonly repository: UrlRepository,
  ) {}

  async create(dto: CreateUrlDto): Promise<UrlEntity> {
    const { originalUrl } = dto;
    const url = UrlEntity.create({ originalUrl });
    await this.repository.create(url);
    return url;
  }

  async redirect(alias: string): Promise<UrlEntity> {
    const url = await this.repository.findByAlias(alias);
    if (!url) throw new BadRequestException();
    url.incrementClick();
    this.repository.save(url);
    return url;
  }
}
