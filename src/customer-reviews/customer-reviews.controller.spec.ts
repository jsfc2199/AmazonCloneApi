import { Test, TestingModule } from '@nestjs/testing';
import { CustomerReviewsController } from './customer-reviews.controller';
import { CustomerReviewsService } from './customer-reviews.service';

describe('CustomerReviewsController', () => {
  let controller: CustomerReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerReviewsController],
      providers: [CustomerReviewsService],
    }).compile();

    controller = module.get<CustomerReviewsController>(CustomerReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
