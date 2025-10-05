import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUrlDto } from '../models/urls.dto';
import { UrlEntity } from '../models/urls.entity';
import { URL_REPOSITORY, UrlRepository } from '../repositories/url.repository';

@Injectable()
export class UrlService {
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

  async findByAlias(alias: string): Promise<UrlEntity> {
    const url = await this.repository.findByAlias(alias);
    if (!url) throw new BadRequestException();
    return url;
  }

  async redirect(alias: string): Promise<UrlEntity> {
    const url = await this.findByAlias(alias);
    url.incrementClick();
    this.repository.save(url);
    return url;
  }
}
