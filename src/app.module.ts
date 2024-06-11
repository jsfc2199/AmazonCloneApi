import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { dataSourceOptions } from 'ormconfig';
import { CommonModule } from './common/common.module';
import { CreditCardsModule } from './credit-cards/credit-cards.module';
import { AddressesModule } from './addresses/addresses.module';
import { SeedModule } from './seed/seed.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { SpecificationHighlightsModule } from './specification-highlights/specification-highlights.module';
import { CustomerReviewsModule } from './customer-reviews/customer-reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    CommonModule,
    CreditCardsModule,
    AddressesModule,
    SeedModule,
    ProductModule,
    CategoryModule,
    ProductImagesModule,
    SpecificationHighlightsModule,
    CustomerReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
