import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UrlModel } from 'src/database/entities/urls';
import { UrlClickMapper } from '../../mappers/url-click.mapper';
import { UrlClickEntity } from '../../models/url-click.entity';
import { IUrlClickRepository } from '../url-repository.interface';

@Injectable()
export class MikroOrmUrlClickRepository implements IUrlClickRepository {
  constructor(private readonly em: EntityManager) {}

  async create(entity: UrlClickEntity): Promise<void> {
    const urlRef = this.em.getReference(UrlModel, entity.props.urlId);
    const data = UrlClickMapper.toPersistence(entity, urlRef);
    await this.em.persistAndFlush(data);
  }
}
