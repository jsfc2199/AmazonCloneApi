import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductUseCase } from './use-cases/product.use-case';
import { ProductRelationsController } from './controllers/product-relations.controller';
import { ProductCategoryUseCase } from './use-cases/linkProductCategory.use-case';
import { CategoryModule } from '../category/category.module';
import { ProductImagesModule } from '../product-images/product-images.module';
import { ProductImageUseCase } from './use-cases/linkProductImage.use-case';
import { SpecificationHighlightsModule } from '../specification-highlights/specification-highlights.module';
import { ProductSpecificationHighlightUseCase } from './use-cases/linkProductSpecHigh.use-case';
import { ProductCustomerReviewsUseCase } from './use-cases/linkProductCustomerReviews.use-case';
import { CustomerReviewsModule } from 'src/customer-reviews/customer-reviews.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CategoryModule,
    ProductImagesModule,
    SpecificationHighlightsModule,
    CustomerReviewsModule,
  ],
  controllers: [ProductController, ProductRelationsController],
  providers: [
    ProductService,
    ProductUseCase,
    ProductCategoryUseCase,
    ProductImageUseCase,
    ProductSpecificationHighlightUseCase,
    ProductCustomerReviewsUseCase,
  ],
  exports: [
    ProductService,
    TypeOrmModule,
    ProductCategoryUseCase,
    ProductImageUseCase,
    ProductSpecificationHighlightUseCase,
    ProductCustomerReviewsUseCase,
  ],
})
export class ProductModule {}
