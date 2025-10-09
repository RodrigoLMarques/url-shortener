import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { EnvService } from 'src/modules/env/env.service';
import { UrlClickEntity } from '../../models/url-click.entity';
import { IUrlClickRepository } from '../url-repository.interface';
import { UrlClickMapper } from '../../mappers/url-click.mapper';

@Injectable()
export class MikroOrmUrlClickRepository implements IUrlClickRepository {
  private protocol: string;
  private domain: string;

  constructor(
    private readonly em: EntityManager,
    private readonly envService: EnvService,
  ) {
    this.protocol = this.envService.get('APP_PROTOCOL');
    this.domain = this.envService.get('APP_DOMAIN');
  }

  async create(entity: UrlClickEntity): Promise<void> {
    const data = UrlClickMapper.toPersistence(entity);
    await this.em.persistAndFlush(data);
  }
}
