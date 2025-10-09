import { Inject, Injectable } from '@nestjs/common';
import ogs from 'open-graph-scraper';
import { OgObject } from 'open-graph-scraper/types';
import { tryCatchAsync } from 'src/helpers/try-catch';
import { CreateUrlMetadataDto } from '../models/url-metadata.dto';
import { UrlMetadataEntity } from '../models/url-metadata.entity';
import { MikroOrmUrlMetadataRepository } from '../repositories/mikro-orm/mikro-orm-url-metadata.repository';
import { URL_METADATA_REPOSITORY } from '../repositories/url-metadata.interface';

interface OpenGraphResult {
  result: OgObject;
  response: { status?: number };
}

@Injectable()
export class UrlMetadataService {
  constructor(
    @Inject(URL_METADATA_REPOSITORY)
    private readonly urlMetadataRepository: MikroOrmUrlMetadataRepository,
  ) {}

  async create(dto: CreateUrlMetadataDto): Promise<UrlMetadataEntity> {
    const { urlId, originalUrl } = dto;

    const metadata = await this.fetchMetadata(originalUrl);

    const urlMetadata = metadata
      ? this.buildMetadata(urlId, metadata)
      : this.buildFallbackMetadata(urlId);

    await this.urlMetadataRepository.create(urlMetadata);
    return urlMetadata;
  }

  private async fetchMetadata(url: string): Promise<OpenGraphResult | null> {
    const [data, error] = await tryCatchAsync(() => ogs({ url }));
    if (error || !data) return null;
    return data as OpenGraphResult;
  }

  private buildMetadata(
    urlId: string,
    { result, response }: OpenGraphResult,
  ): UrlMetadataEntity {
    return UrlMetadataEntity.create({
      urlId,
      title: result.ogTitle || result.twitterTitle,
      description: result.ogDescription || result.twitterDescription,
      imageUrl: result.ogImage?.[0]?.url,
      siteName: result.ogSiteName,
      statusCode: response?.status,
      fetchedAt: new Date(),
    });
  }

  private buildFallbackMetadata(urlId: string): UrlMetadataEntity {
    return UrlMetadataEntity.create({
      urlId,
      fetchedAt: new Date(),
    });
  }
}
