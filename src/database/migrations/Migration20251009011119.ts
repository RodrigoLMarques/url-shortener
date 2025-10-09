import { Migration } from '@mikro-orm/migrations';

export class Migration20251009011119 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "url_metadata" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" varchar(255) null, "title" varchar(255) null, "description" varchar(255) null, "image_url" varchar(255) null, "site_name" varchar(255) null, "status_code" int null, "fetched_at" timestamptz null, "url_id" varchar(255) not null, constraint "url_metadata_pkey" primary key ("id"));`);
    this.addSql(`alter table "url_metadata" add constraint "url_metadata_url_id_unique" unique ("url_id");`);

    this.addSql(`create table "url_clicks" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" varchar(255) null, "clicked_at" timestamptz not null, "ip_address" varchar(255) null, "country" varchar(255) null, "city" varchar(255) null, "referrer" varchar(255) null, "user_agent" varchar(255) null, "device_type" varchar(255) null, "os" varchar(255) null, "browser" varchar(255) null, "url_id" varchar(255) not null, constraint "url_clicks_pkey" primary key ("id"));`);

    this.addSql(`alter table "url_metadata" add constraint "url_metadata_url_id_foreign" foreign key ("url_id") references "urls" ("id") on update cascade;`);

    this.addSql(`alter table "url_clicks" add constraint "url_clicks_url_id_foreign" foreign key ("url_id") references "urls" ("id") on update cascade;`);

    this.addSql(`alter table "urls" drop column "clicks";`);

    this.addSql(`alter table "urls" add column "expires_at" timestamptz null;`);
    this.addSql(`alter table "urls" alter column "id" type varchar(255) using ("id"::varchar(255));`);
    this.addSql(`create index "urls_alias_index" on "urls" ("alias");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "url_metadata" cascade;`);

    this.addSql(`drop table if exists "url_clicks" cascade;`);

    this.addSql(`drop index "urls_alias_index";`);
    this.addSql(`alter table "urls" drop column "expires_at";`);

    this.addSql(`alter table "urls" add column "clicks" int not null default 0;`);
    this.addSql(`alter table "urls" alter column "id" type varchar using ("id"::varchar);`);
  }

}
