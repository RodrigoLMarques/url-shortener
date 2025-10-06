import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UrlModel } from 'src/database/entities/urls';
import { UrlMapper } from '../../mappers/url.mapper';
import { UrlEntity } from '../../models/url.entity';
import { IUrlRepository } from '../url-repository.interface';

@Injectable()
export class MikroOrmUrlRepository implements IUrlRepository {
  constructor(private readonly em: EntityManager) {}

  async create(entity: UrlEntity): Promise<void> {
    const data = UrlMapper.toPersistence(entity);
    await this.em.persistAndFlush(data);
  }

  async save(entity: UrlEntity): Promise<void> {
    const url = await this.em.findOne(UrlModel, { alias: entity.alias });
    if (!url) return;
    const data = UrlMapper.toPersistence(entity);
    wrap(url).assign(data);
    await this.em.flush();
  }

  async findByAlias(alias: string): Promise<UrlEntity | null> {
    const data = await this.em.findOne(UrlModel, { alias });
    if (!data) return null;
    return UrlMapper.toDomain(data);
  }
}
