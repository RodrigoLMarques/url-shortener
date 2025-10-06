import { Migration } from '@mikro-orm/migrations';

export class Migration20251006192155 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "urls" ("id" varchar not null, "original_url" varchar(255) not null, "alias" varchar(255) not null, "clicks" int not null default 0, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" varchar(255) null, constraint "urls_pkey" primary key ("id"));`);
    this.addSql(`alter table "urls" add constraint "urls_alias_unique" unique ("alias");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "urls" cascade;`);
  }

}
