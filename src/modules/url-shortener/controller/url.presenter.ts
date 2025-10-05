import { UrlEntity } from '../models/url-shortener.entity';

export class UrlPresenter {
  id: string;
  originalUrl: string;
  shortUrl: string;
  alias?: string;
  clicks?: number;

  constructor(entity: UrlEntity) {
    this.id = entity.id;
    this.originalUrl = entity.originalUrl;
    this.shortUrl = entity.shortUrl;
    this.alias = entity.alias;
    this.clicks = entity.clicks;
  }

  toJSON() {
    return {
      id: this.id,
      originalUrl: this.originalUrl,
      shortUrl: this.shortUrl,
      alias: this.alias,
      clicks: this.clicks,
    };
  }
}
