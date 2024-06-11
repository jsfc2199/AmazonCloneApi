import { Test, TestingModule } from '@nestjs/testing';
import { CustomerReviewsService } from './customer-reviews.service';

describe('CustomerReviewsService', () => {
  let service: CustomerReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerReviewsService],
    }).compile();

    service = module.get<CustomerReviewsService>(CustomerReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
