import { IsArray, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ each: true })
  @IsArray()
  category: string[];
}
