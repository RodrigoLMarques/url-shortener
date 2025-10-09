import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './base-entity';
import { UrlModel } from './urls';

@Entity({ tableName: 'url_clicks' })
export class UrlClickModel extends BaseEntity {
  @Property({ fieldName: 'clicked_at' })
  clickedAt: Date = new Date();

  @Property({ fieldName: 'ip_address', nullable: true })
  ipAddress?: string;

  @Property({ nullable: true })
  country?: string;

  @Property({ nullable: true })
  city?: string;

  @Property({ nullable: true })
  referrer?: string;

  @Property({ fieldName: 'user_agent', nullable: true })
  userAgent?: string;

  @Property({ fieldName: 'device_type', nullable: true })
  deviceType?: string;

  @Property({ nullable: true })
  os?: string;

  @Property({ nullable: true })
  browser?: string;

  @ManyToOne(() => UrlModel)
  url!: UrlModel;
}
