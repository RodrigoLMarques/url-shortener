import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  readonly originalUrl: string;
}
