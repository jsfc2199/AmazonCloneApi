import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Review } from './entities/review.entity';

@Module({
  controllers: [RatingController],
  providers: [RatingService],
  imports: [TypeOrmModule.forFeature([Rating, Review])],
})
export class RatingModule {}
