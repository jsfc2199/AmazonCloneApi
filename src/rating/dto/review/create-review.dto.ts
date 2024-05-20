import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  text: string;

  @IsNumber()
  rating: number;

  @IsString()
  review_submission_time: string;

  @IsString()
  user_nickname: string;
}
