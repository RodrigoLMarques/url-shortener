import { Injectable } from '@nestjs/common';
import { UrlEntity } from '../../models/urls.entity';
import { UrlRepository } from '../url.repository';

@Injectable()
export class InMemoryUrlRepository implements UrlRepository {
  constructor(public entities: UrlEntity[] = []) {}

  async create(entity: UrlEntity): Promise<void> {
    this.entities.push(entity);
  }

  async save(entity: UrlEntity): Promise<void> {
    const index = this.entities.findIndex((e) => e.alias === entity.alias);
    if (index === -1) return;
    this.entities[index] = entity;
  }

  async findByAlias(alias: string): Promise<UrlEntity | null> {
    const entity = this.entities.find((e) => e.alias === alias);
    if (!entity) return null;
    return entity;
  }
}
