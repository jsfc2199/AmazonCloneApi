import { IsArray, IsString } from 'class-validator';

export class CreateProductImageDto {
  @IsString({ each: true })
  @IsArray()
  images: string[];
}
