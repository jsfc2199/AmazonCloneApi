import { IsOptional, IsString } from 'class-validator';

export class CreateSpecificationHighlightDto {
  @IsString()
  feature: string;

  @IsString()
  @IsOptional()
  featureDescription?: string;

  @IsString()
  featureDisplayName: string;

  @IsString()
  assembledSpecs: string;

  @IsString()
  @IsOptional()
  assembledDescription?: string;

  @IsString()
  assembledDisplayName: string;
}
