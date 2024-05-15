import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from '../product.service';

import { SpecificationHighlightsService } from '../../specification-highlights/specification-highlights.service';
import { CreateSpecificationHighlightDto } from '../../specification-highlights/dto/create-specification-highlight.dto';
import { ProductFeatures } from '../../seed/model/product.model';
import { SpecificationHighlight } from '../../specification-highlights/entities/specification-highlight.entity';

export interface Response {
  productId: string;
  specificationHighlight: ProductFeatures;
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

    const { specificationHighlights } = product;

    if (!specificationHighlights) {
      const productSpecificationHighlight =
        (await this.specificationHighlightsService.create(
          createSpecificationHighlightDto,
          product,
        )) as SpecificationHighlight;

      const {
        feature,
        featureDescription,
        featureDisplayName,
        assembledSpecs,
        assembledDescription,
        assembledDisplayName,
      } = productSpecificationHighlight;

      const response: Response = {
        productId,
        specificationHighlight: {
          feature,
          featureDescription,
          featureDisplayName,
          assembledSpecs,
          assembledDescription,
          assembledDisplayName,
        },
      };

      return response;
    } else {
      throw new BadRequestException(
        `Product with id ${productId} already has a related specification highlight`,
      );
    }
  }
}
