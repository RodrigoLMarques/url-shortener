import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateUrlClickDto {
  @IsNotEmpty()
  @IsString()
  readonly urlId: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ClickData)
  readonly clickData: ClickData;
}

export class ClickData {
  @IsOptional()
  @IsString()
  readonly ipAddress?: string;

  @IsOptional()
  @IsString()
  readonly referrer?: string;

  @IsOptional()
  @IsString()
  readonly userAgent?: string;
}
