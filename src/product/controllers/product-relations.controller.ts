import { Controller, Post, Body, Param } from '@nestjs/common';

import { ProductCategoryUseCase } from '../use-cases/linkProductCategory.use-case';
import { CreateCategoryDto } from '../../category/dto/create-category.dto';

@Controller('product-relations')
export class ProductRelationsController {
  constructor(
    private readonly productCategoryUseCase: ProductCategoryUseCase,
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
}
