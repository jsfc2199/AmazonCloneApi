import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AddressesModule } from '../addresses/addresses.module';
import { CreditCardsModule } from '../credit-cards/credit-cards.module';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { CategoryModule } from '../category/category.module';
import { ProductImagesModule } from '../product-images/product-images.module';
import { SpecificationHighlightsModule } from '../specification-highlights/specification-highlights.module';
import { CustomerReviewsModule } from '../customer-reviews/customer-reviews.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    AddressesModule,
    CreditCardsModule,
    UserModule,
    ProductModule,
    CategoryModule,
    ProductImagesModule,
    SpecificationHighlightsModule,
    CustomerReviewsModule,
  ],
})
export class SeedModule {}
