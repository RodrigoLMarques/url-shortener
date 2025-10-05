import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'urls' })
export class UrlModel {
  @PrimaryKey({ columnType: 'varchar', length: 24 })
  id: string;

  @Property({ fieldName: 'original_url' })
  originalUrl: string;

  @Property()
  alias: string;

  @Property({ columnType: 'int' })
  clicks: number;

  @Property({ fieldName: 'created_at' })
  createdAt = new Date();

  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ fieldName: 'deleted_at', nullable: true })
  deletedAt?: Date | null;
}
