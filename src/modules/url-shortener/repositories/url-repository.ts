import { UrlEntity } from '../models/url-shortener.entity';

export abstract class UrlRepository {
  abstract create(entity: UrlEntity): Promise<void>;
}
