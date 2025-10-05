import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { CreateUrlDto } from '../models/url-shortener.dto';
import { UrlShortenerService } from '../services/url-shortener.service';
import { UrlPresenter } from './url.presenter';

@Controller()
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post('urls')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUrlDto) {
    const entity = await this.urlShortenerService.create(dto);
    return new UrlPresenter(entity).toJSON();
  }

  @Get(':alias')
  async redirect(@Param('alias') alias: string, @Res() res: Response) {
    const entity = await this.urlShortenerService.redirect(alias);
    return res.redirect(entity.originalUrl);
  }
}
