import { Migration } from '@mikro-orm/migrations';

export class Migration20251005143355 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "urls" drop constraint "urls_user_id_foreign";`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`alter table "urls" drop column "user_id";`);

    this.addSql(`alter table "urls" add column "clicks" int not null;`);
    this.addSql(`alter table "urls" alter column "id" type varchar using ("id"::varchar);`);
    this.addSql(`alter table "urls" rename column "short_url" to "alias";`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "users" ("id" varchar not null, "email" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz(6) not null, "updated_at" timestamptz(6) not null, "deleted_at" varchar(255) null, constraint "users_pkey" primary key ("id"));`);

    this.addSql(`alter table "urls" drop column "clicks";`);

    this.addSql(`alter table "urls" add column "user_id" varchar null;`);
    this.addSql(`alter table "urls" alter column "id" type varchar using ("id"::varchar);`);
    this.addSql(`alter table "urls" add constraint "urls_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "urls" rename column "alias" to "short_url";`);
  }

}
