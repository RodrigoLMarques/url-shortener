import { UrlModel } from 'src/database/entities/urls';
import { UrlEntity } from '../models/url.entity';

export class UrlMapper {
  static toDomain(raw: UrlModel, protocol: string, domain: string): UrlEntity {
    return UrlEntity.create(
      {
        originalUrl: raw.originalUrl,
        alias: raw.alias,
        clicks: raw.clicks,
        protocol,
        domain,
      },
      raw.id,
    );
  }

  static toPersistence(url: UrlEntity): UrlModel {
    return Object.assign(new UrlModel(), {
      id: url.id,
      originalUrl: url.originalUrl,
      alias: url.alias,
      clicks: url.clicks,
    });
  }
}
