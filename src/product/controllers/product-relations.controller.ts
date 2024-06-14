import { Controller, Post, Body, Param } from '@nestjs/common';

import { ProductCategoryUseCase } from '../use-cases/linkProductCategory.use-case';
import { CreateCategoryDto } from '../../category/dto/create-category.dto';
import { CreateProductImageDto } from '../../product-images/dto/create-product-image.dto';
import { ProductImageUseCase } from '../use-cases/linkProductImage.use-case';
import { ProductSpecificationHighlightUseCase } from '../use-cases/linkProductSpecHigh.use-case';
import { CreateSpecificationHighlightDto } from '../../specification-highlights/dto/create-specification-highlight.dto';
import { CreateCustomerReviewsDto } from '../../customer-reviews/dto/create-customer-review.dto';
import { ProductCustomerReviewsUseCase } from '../use-cases/linkProductCustomerReviews.use-case';

@Controller('product-relations')
export class ProductRelationsController {
  constructor(
    private readonly productCategoryUseCase: ProductCategoryUseCase,
    private readonly productImageUseCase: ProductImageUseCase,
    private readonly productSpecificationHighlightUseCase: ProductSpecificationHighlightUseCase,
    private readonly productCustomerReviewsUseCase: ProductCustomerReviewsUseCase,
  ) {}

  @Post('category/:term')
  async createProductCategoryRelation(
    @Param('term') term: string,
    @Body() categoryDto: CreateCategoryDto,
  ) {
    return await this.productCategoryUseCase.linkProductCategoryUseCase(
      term,
      categoryDto,
    );
  }

  @Post('image/:term')
  async createProductImgRelation(
    @Param('term') term: string,
    @Body() imageDto: CreateProductImageDto,
  ) {
    return await this.productImageUseCase.linkProductImageUseCase(
      term,
      imageDto,
    );
  }

  @Post('specification-highlight/:term')
  async createProductSpecificationHighlightRelation(
    @Param('term') term: string,
    @Body() specHighDto: CreateSpecificationHighlightDto,
  ) {
    return await this.productSpecificationHighlightUseCase.linkProductSpecificationHighlightUseCase(
      term,
      specHighDto,
    );
  }

  @Post('customer-reviews/:term')
  async createProductCustomerReviewRelation(
    @Param('term') term: string,
    @Body() customerReviews: CreateCustomerReviewsDto,
  ) {
    return await this.productCustomerReviewsUseCase.linkProductCustomerReviewUseCase(
      term,
      customerReviews,
    );
  }
}
