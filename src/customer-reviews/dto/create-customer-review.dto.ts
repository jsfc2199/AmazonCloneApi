import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCustomerReviewDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  text: string;

  @IsNumber()
  rating: number;

  @IsString()
  review_submission_time: string;

  @IsString()
  @IsOptional()
  user_nickname: string;

  @IsString()
  @IsOptional()
  nanoid: string;
}

export class CreateCustomerReviewsDto {
  @IsOptional()
  customer_reviews: CreateCustomerReviewDto[];
}
