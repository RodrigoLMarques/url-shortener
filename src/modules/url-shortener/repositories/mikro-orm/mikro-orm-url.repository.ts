import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UrlMapper } from '../../mappers/url.mapper';
import { UrlEntity } from '../../models/url-shortener.entity';
import { UrlRepository } from '../url-repository';

@Injectable()
export class MikroOrmUrlRepository implements UrlRepository {
  constructor(private readonly em: EntityManager) {}

  async create(entity: UrlEntity): Promise<void> {
    const model = UrlMapper.toPersistence(entity);
    await this.em.persistAndFlush(model);
  }
}
