import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UrlModel } from 'src/entities/urls';
import { UrlMapper } from '../mappers/url.mapper';
import { CreateUrlDto } from '../models/url-shortener.dto';
import { UrlEntity } from '../models/url-shortener.entity';

@Injectable()
export class UrlShortenerService {
  constructor(
    @InjectRepository(UrlModel)
    private readonly urlRepository: EntityRepository<UrlModel>,
  ) {}

  async create(dto: CreateUrlDto): Promise<UrlEntity> {
    const url = UrlEntity.create({
      originalUrl: dto.originalUrl,
    });

    url.generateAlias();

    this.urlRepository.create(UrlMapper.toPersistence(url));

    return url;
  }
}
