import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationCriteriaDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  filter?: number;

  @IsString()
  @IsOptional()
  criteria?: string;
}
