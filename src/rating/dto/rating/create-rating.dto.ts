import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { CreateReviewDto } from '../review/create-review.dto';
import { Type } from 'class-transformer';

export class CreateRatingDto {
  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsNumber()
  count: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateReviewDto)
  customer_reviews?: CreateReviewDto[];
}
