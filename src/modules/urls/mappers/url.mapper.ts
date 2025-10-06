import { UrlModel } from 'src/database/entities/urls';
import { UrlEntity } from '../entities/url.entity';

export class UrlMapper {
  static toDomain(raw: UrlModel): UrlEntity {
    return UrlEntity.create(
      {
        originalUrl: raw.originalUrl,
        alias: raw.alias,
        clicks: raw.clicks,
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
