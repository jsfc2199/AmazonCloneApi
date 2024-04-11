import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductUseCase } from './use-cases/product.use-case';
import { ProductRelationsController } from './controllers/product-relations.controller';
import { ProductCategoryUseCase } from './use-cases/linkProductCategory.use-case';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  controllers: [ProductController, ProductRelationsController],
  providers: [ProductService, ProductUseCase, ProductCategoryUseCase],
  exports: [ProductService, TypeOrmModule, ProductCategoryUseCase],
})
export class ProductModule {}
