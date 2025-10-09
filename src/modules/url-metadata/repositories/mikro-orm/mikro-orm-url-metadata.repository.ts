import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UrlMetadataModel } from 'src/database/entities/url-metadata';
import { UrlModel } from 'src/database/entities/urls';
import { UrlMetadataMapper } from '../../mappers/url-metadata.mappers';
import { UrlMetadataEntity } from '../../models/url-metadata.entity';
import { IUrlMetadataRepository } from '../url-metadata.interface';

@Injectable()
export class MikroOrmUrlMetadataRepository implements IUrlMetadataRepository {
  constructor(private readonly em: EntityManager) {}

  async create(entity: UrlMetadataEntity): Promise<void> {
    const urlRef = this.em.getReference(UrlModel, entity.props.urlId);
    const data = UrlMetadataMapper.toPersistence(entity, urlRef);
    await this.em.persistAndFlush(data);
  }

  async count(urlId: string): Promise<number> {
    const count = await this.em.count(UrlMetadataModel, { url: { id: urlId } });
    return count;
  }
}
