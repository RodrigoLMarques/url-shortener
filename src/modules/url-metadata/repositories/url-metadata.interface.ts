import { UrlMetadataEntity } from '../models/url-metadata.entity';

export interface IUrlMetadataRepository {
  create(entity: UrlMetadataEntity): Promise<void>;
}

export const URL_METADATA_REPOSITORY = 'UrlMetadataRepository';
