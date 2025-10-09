import { UrlMetadataModel } from 'src/database/entities/url-metadata';
import { UrlModel } from 'src/database/entities/urls';
import { UrlMetadataEntity } from '../models/url-metadata.entity';

export class UrlMetadataMapper {
  static toDomain(raw: UrlMetadataModel): UrlMetadataEntity {
    return UrlMetadataEntity.create(
      {
        urlId: raw.url.id,
        title: raw.title,
        description: raw.description,
        imageUrl: raw.imageUrl,
        siteName: raw.siteName,
        statusCode: raw.statusCode,
        fetchedAt: raw.fetchedAt,
      },
      raw.id,
    );
  }

  static toPersistence(
    entity: UrlMetadataEntity,
    url: UrlModel,
  ): UrlMetadataModel {
    return Object.assign(new UrlMetadataModel(), {
      id: entity.id,
      url,
      title: entity.props.title,
      description: entity.props.description,
      imageUrl: entity.props.imageUrl,
      siteName: entity.props.siteName,
      statusCode: entity.props.statusCode,
      fetchedAt: entity.props.fetchedAt,
    });
  }
}
