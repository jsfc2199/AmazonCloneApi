import { Injectable } from '@nestjs/common';
import { ProductService } from '../product.service';

import { SpecificationHighlightsService } from '../../specification-highlights/specification-highlights.service';
import { CreateSpecificationHighlightDto } from '../../specification-highlights/dto/create-specification-highlight.dto';

export interface Response {
  productId: string;
  images: string[];
}

@Injectable()
export class ProductSpecificationHighlightUseCase {
  constructor(
    private readonly productService: ProductService,
    private readonly specificationHighlightsService: SpecificationHighlightsService,
  ) {}

  async linkProductSpecificationHighlightUseCase(
    productId: string,
    createSpecificationHighlightDto: CreateSpecificationHighlightDto,
  ) {
    const product = await this.productService.findOne(productId);

    console.log(product);
  }
}
