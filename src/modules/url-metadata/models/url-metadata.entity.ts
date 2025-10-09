import { Entity } from 'src/core/entity';

export interface IUrlMetadataProps {
  urlId: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  siteName?: string;
  statusCode?: number;
  fetchedAt?: Date;
}

export class UrlMetadataEntity extends Entity<IUrlMetadataProps> {
  constructor(props: IUrlMetadataProps, id?: string) {
    super(props, id);
  }

  static create(props: IUrlMetadataProps, id?: string) {
    const entity = new UrlMetadataEntity(props, id);
    return entity;
  }
}
