import { UrlEntity } from '../models/url.entity';

export interface IUrlRepository {
  create(entity: UrlEntity): Promise<void>;
  save(entity: UrlEntity): Promise<void>;
  findByAlias(alias: string): Promise<UrlEntity | null>;
}

export const URL_REPOSITORY = 'UrlRepository';
