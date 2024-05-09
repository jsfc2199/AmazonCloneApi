import { Controller, Post, Body, Param } from '@nestjs/common';

import { ProductCategoryUseCase } from '../use-cases/linkProductCategory.use-case';
import { CreateCategoryDto } from '../../category/dto/create-category.dto';
import { CreateProductImageDto } from '../../product-images/dto/create-product-image.dto';
import { ProductImageUseCase } from '../use-cases/linkProductImage.use-case';

@Controller('product-relations')
export class ProductRelationsController {
  constructor(
    private readonly productCategoryUseCase: ProductCategoryUseCase,
    private readonly productImageUseCase: ProductImageUseCase,
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
}
