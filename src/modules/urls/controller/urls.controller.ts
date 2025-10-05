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
import { CreateUrlDto } from '../models/urls.dto';
import { UrlService } from '../services/urls.service';
import { UrlPresenter } from './urls.presenter';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('urls')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUrlDto) {
    const entity = await this.urlService.create(dto);
    return new UrlPresenter(entity).toJSON();
  }

  @Get('urls/:alias')
  async findByAlias(@Param('alias') alias: string) {
    const entity = await this.urlService.findByAlias(alias);
    return new UrlPresenter(entity).toJSON();
  }

  @Get(':alias')
  async redirect(@Param('alias') alias: string, @Res() res: Response) {
    const entity = await this.urlService.redirect(alias);
    return res.redirect(entity.originalUrl);
  }
}
