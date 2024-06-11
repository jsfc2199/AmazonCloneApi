import { Injectable } from '@nestjs/common';
import {
  CreateCustomerReviewDto,
  CreateCustomerReviewsDto,
} from './dto/create-customer-review.dto';
import { UpdateCustomerReviewDto } from './dto/update-customer-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerReview } from './entities/customer-review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerReviewsService {
  constructor(
    @InjectRepository(CustomerReview)
    private readonly customerReviewRepository: Repository<CustomerReview>,
  ) {}

  //in real life this one is the one to use cause per user they only can type for one review each time
  async createOne(createCustomerReviewDto: CreateCustomerReviewDto) {
    const customerReviewCreated = this.customerReviewRepository.create(
      createCustomerReviewDto,
    );
    const customerReviewSaved = await this.customerReviewRepository.save(
      customerReviewCreated,
    );
    return customerReviewSaved;
  }

  async createMany(createCustomerReviewsDto: CreateCustomerReviewsDto) {
    const customerReviewsCreated =
      createCustomerReviewsDto.customer_reviews.map((customerReview) => {
        return this.customerReviewRepository.create(customerReview);
      });

    const customerReviewsSaved = await this.customerReviewRepository.save(
      customerReviewsCreated,
    );
    return customerReviewsSaved;
  }

  findAll() {
    return `This action returns all customerReviews`;
  }

  async findOne(id: string) {
    const review = await this.customerReviewRepository.findOne({
      where: {
        id,
      },
    });
    return review;
  }

  update(id: number, updateCustomerReviewDto: UpdateCustomerReviewDto) {
    return `This action updates a #${id} customerReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerReview`;
  }
}
