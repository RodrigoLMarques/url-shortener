import { UrlClickModel } from 'src/database/entities/url-clicks';
import { UrlModel } from 'src/database/entities/urls';
import { UrlClickEntity } from '../models/url-click.entity';

export class UrlClickMapper {
  static toDomain(raw: UrlClickModel): UrlClickEntity {
    return UrlClickEntity.create(
      {
        urlId: raw.url.id,
        clickedAt: raw.clickedAt,
        ipAddress: raw.ipAddress,
        country: raw.country,
        city: raw.city,
        referrer: raw.referrer,
        userAgent: raw.userAgent,
        deviceType: raw.deviceType,
        os: raw.os,
        browser: raw.browser,
      },
      raw.id,
    );
  }

  static toPersistence(entity: UrlClickEntity, url: UrlModel): UrlClickModel {
    return Object.assign(new UrlClickModel(), {
      id: entity.id,
      url,
      clickedAt: entity.props.clickedAt,
      ipAddress: entity.props.ipAddress,
      country: entity.props.country,
      city: entity.props.city,
      referrer: entity.props.referrer,
      userAgent: entity.props.userAgent,
      deviceType: entity.props.deviceType,
      os: entity.props.os,
      browser: entity.props.browser,
    });
  }
}
