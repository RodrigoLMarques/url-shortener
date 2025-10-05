import { UrlEntity } from '../models/urls.entity';

export class UrlPresenter {
  id: string;
  originalUrl: string;
  shortUrl: string;
  alias?: string;
  clicks?: number;
  domain: string;

  constructor(entity: UrlEntity) {
    this.id = entity.id;
    this.originalUrl = entity.originalUrl;
    this.shortUrl = entity.shortUrl;
    this.alias = entity.alias;
    this.clicks = entity.clicks;
    this.domain = entity.domain;
  }

  toJSON() {
    return {
      originalUrl: this.originalUrl,
      shortUrl: this.shortUrl,
      alias: this.alias,
      domain: this.domain,
      clicks: this.clicks,
    };
  }
}
