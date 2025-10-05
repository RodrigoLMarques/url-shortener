import { UrlEntity } from '../models/urls.entity';

export abstract class UrlRepository {
  abstract create(entity: UrlEntity): Promise<void>;
  abstract save(entity: UrlEntity): Promise<void>;
  abstract findByAlias(alias: string): Promise<UrlEntity | null>;
}

export const URL_REPOSITORY = 'UrlRepository';
