import { Inject, Injectable } from '@nestjs/common';
import { CreateUrlDto } from '../models/url-shortener.dto';
import { UrlEntity } from '../models/url-shortener.entity';
import { UrlRepository } from '../repositories/url-repository';

@Injectable()
export class UrlShortenerService {
  constructor(
    @Inject('UrlRepository')
    private readonly urlRepository: UrlRepository,
  ) {}

  async create(dto: CreateUrlDto): Promise<UrlEntity> {
    const { originalUrl } = dto;
    const url = UrlEntity.create({ originalUrl });
    await this.urlRepository.create(url);
    return url;
  }
}
