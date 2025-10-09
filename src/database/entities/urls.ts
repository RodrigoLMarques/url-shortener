import {
  Collection,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from './base-entity';
import { UrlClickModel } from './url-clicks';
import { UrlMetadataModel } from './url-metadata';

@Entity({ tableName: 'urls' })
@Index({ properties: ['alias'] })
export class UrlModel extends BaseEntity {
  @Property({ fieldName: 'original_url' })
  originalUrl!: string;

  @Property()
  @Unique()
  alias!: string;

  @Property({ nullable: true })
  expires_at?: Date;

  @OneToMany(() => UrlClickModel, (click) => click.url)
  clicks = new Collection<UrlClickModel>(this);

  @OneToOne(() => UrlMetadataModel, (metadata) => metadata.url)
  metadata?: UrlMetadataModel;
}
