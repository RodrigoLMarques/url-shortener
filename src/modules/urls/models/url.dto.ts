import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({
    description: 'The original URL to be shortened',
    example: 'https://www.google.com',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  readonly originalUrl: string;
}

