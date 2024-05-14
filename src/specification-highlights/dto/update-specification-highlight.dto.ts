import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecificationHighlightDto } from './create-specification-highlight.dto';

export class UpdateSpecificationHighlightDto extends PartialType(CreateSpecificationHighlightDto) {}
