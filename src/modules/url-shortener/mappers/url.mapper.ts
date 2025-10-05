import { UrlModel } from 'src/entities/urls';
import { UrlEntity } from '../models/url-shortener.entity';

export class UrlMapper {
  static toDomain(raw: UrlModel): UrlEntity {
    const url = UrlEntity.create(
      {
        originalUrl: raw.originalUrl,
        alias: raw.alias,
        clicks: raw.clicks,
      },
      raw.id,
    );

    return url;
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
