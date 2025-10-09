import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { ClickData } from 'src/modules/url-clicks/models/url-click.dto';
import { UrlPresenter } from '../mappers/urls.presenter';
import { CreateUrlDto } from '../models/url.dto';
import { UrlService } from '../services/urls.service';

@ApiTags('URL Shortener')
@Controller()
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly urlPresenter: UrlPresenter,
  ) {}

  @ApiOperation({
    summary: 'Create a new shortened URL',
    description:
      'Receives an original URL and returns a shortened URL with unique alias',
  })
  @ApiBody({
    type: CreateUrlDto,
    description: 'URL data to be shortened',
    examples: {
      example1: {
        summary: 'URL Example',
        description: 'Example of creating a shortened URL',
        value: {
          originalUrl: 'https://www.google.com',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Shortened URL created successfully',
    type: UrlPresenter,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
  })
  @Post('urls')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUrlDto) {
    const entity = await this.urlService.create(dto);
    return this.urlPresenter.toResponse(entity);
  }

  @ApiOperation({
    summary: 'Find URL by alias',
    description: 'Returns detailed information of a shortened URL by its alias',
  })
  @ApiParam({
    name: 'alias',
    description: 'The unique alias of the shortened URL',
    example: 'abc123',
    type: String,
  })
  @ApiOkResponse({
    description: 'URL found successfully',
    type: UrlPresenter,
  })
  @ApiNotFoundResponse({
    description: 'URL not found',
  })
  @Get('urls/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const entity = await this.urlService.getByAlias(alias);
    return this.urlPresenter.toResponse(entity);
  }

  @ApiOperation({
    summary: 'Redirect to original URL',
    description:
      'Redirects the user to the original URL and increments the click counter',
  })
  @ApiParam({
    name: 'alias',
    description: 'The unique alias of the shortened URL',
    example: 'abc123',
    type: String,
  })
  @ApiResponse({
    status: 302,
    description: 'Redirect to the original URL',
    headers: {
      Location: {
        description: 'Original URL where the user will be redirected',
        schema: {
          type: 'string',
          example: 'https://www.google.com',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'URL not found',
  })
  @Get(':alias')
  async redirect(
    @Param('alias') alias: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const clickData: ClickData = {
      ipAddress: req.ip || req.socket.remoteAddress,
      referrer: req.get('referer') || req.get('referrer'),
      userAgent: req.get('user-agent'),
    };
    const entity = await this.urlService.redirect(alias, clickData);
    return res.redirect(entity.originalUrl);
  }
}
