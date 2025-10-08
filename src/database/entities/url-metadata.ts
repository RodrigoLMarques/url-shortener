import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './base-entity';
import { UrlModel } from './urls';

@Entity({ tableName: 'url_metadata' })
export class UrlMetadataModel extends BaseEntity {
  @Property({ nullable: true })
  title?: string;

  @Property({ nullable: true })
  description?: string;

  @Property({ fieldName: 'image_url', nullable: true })
  imageUrl?: string;

  @Property({ fieldName: 'site_name', nullable: true })
  siteName?: string;

  @Property({ fieldName: 'status_code', nullable: true })
  statusCode?: number;

  @Property({ fieldName: 'fetched_at', nullable: true })
  fetchedAt?: Date;

  @ManyToOne()
  url!: UrlModel;
}
