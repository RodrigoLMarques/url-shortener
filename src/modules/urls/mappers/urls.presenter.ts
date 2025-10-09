import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { EnvService } from 'src/modules/env/env.service';
import { UrlEntity } from '../models/url.entity';

@Injectable()
export class UrlPresenter {
  @ApiProperty({
    description: 'The original URL',
    example: 'https://www.google.com',
  })
  originalUrl: string;

  @ApiProperty({
    description: 'The shortened URL',
    example: 'http://localhost:3000/abc123',
  })
  shortUrl: string;

  @ApiProperty({ description: 'The unique URL alias', example: 'abc123' })
  alias: string;

  @ApiProperty({ description: 'The service domain', example: 'localhost:3000' })
  domain: string;

  @ApiProperty({ description: 'Number of clicks on the URL', example: 0 })
  clicks: number;

  constructor(private readonly env: EnvService) {}

  toResponse(entity: UrlEntity) {
    const protocol = this.env.get('APP_PROTOCOL');
    const domain = this.env.get('APP_DOMAIN');

    return {
      originalUrl: entity.originalUrl,
      alias: entity.alias,
      domain,
      shortUrl: `${protocol}://${domain}/${entity.alias}`,
      clicks: 0, // TODO
    };
  }
}
