import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUrlDto } from '../models/url-shortener.dto';
import { UrlShortenerService } from '../services/url-shortener.service';
import { UrlPresenter } from './url.presenter';

@Controller('urls')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUrlDto) {
    const entity = await this.urlShortenerService.create(dto);
    return new UrlPresenter(entity).toJSON();
  }
}
