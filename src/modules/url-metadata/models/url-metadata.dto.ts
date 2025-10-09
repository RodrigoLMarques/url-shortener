import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUrlMetadataDto {
  @IsNotEmpty()
  @IsString()
  readonly urlId: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  readonly originalUrl: string;
}
