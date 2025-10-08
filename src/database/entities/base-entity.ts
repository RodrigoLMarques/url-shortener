import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity {
  @PrimaryKey()
  id!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ fieldName: 'deleted_at', nullable: true })
  deletedAt?: Date | null = null;
}
