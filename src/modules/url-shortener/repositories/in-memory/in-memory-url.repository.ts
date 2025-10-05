import { Injectable } from '@nestjs/common';
import { UrlEntity } from '../../models/url-shortener.entity';
import { UrlRepository } from '../url-repository';

@Injectable()
export class InMemoryUrlRepository implements UrlRepository {
  constructor(public entities: UrlEntity[] = []) {}

  async create(entity: UrlEntity): Promise<void> {
    this.entities.push(entity);
  }
}
