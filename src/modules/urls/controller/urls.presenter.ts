import { ApiProperty } from '@nestjs/swagger';
import { UrlEntity } from '../models/urls.entity';

export class UrlPresenter {
  @ApiProperty({ description: 'The original URL', example: 'https://www.google.com' })
  originalUrl: string;

  @ApiProperty({ description: 'The shortened URL', example: 'http://localhost:3000/abc123' })
  shortUrl: string;

  @ApiProperty({ description: 'The unique URL alias', example: 'abc123' })
  alias: string;

  @ApiProperty({ description: 'The service domain', example: 'localhost:3000' })
  domain: string;

  @ApiProperty({ description: 'Number of clicks on the URL', example: 0 })
  clicks: number;

  constructor(entity: UrlEntity) {
    this.originalUrl = entity.originalUrl;
    this.shortUrl = entity.shortUrl;
    this.alias = entity.alias!;
    this.domain = entity.domain;
    this.clicks = entity.clicks!;
  }
}
