import { Module } from '@nestjs/common';
import { CustomerReviewsService } from './customer-reviews.service';
import { CustomerReviewsController } from './customer-reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerReview } from './entities/customer-review.entity';

@Module({
  controllers: [CustomerReviewsController],
  providers: [CustomerReviewsService],
  imports: [TypeOrmModule.forFeature([CustomerReview])],
  exports: [CustomerReviewsService],
})
export class CustomerReviewsModule {}
