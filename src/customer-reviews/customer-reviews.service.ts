import { Injectable } from '@nestjs/common';
import {
  CreateCustomerReviewDto,
  CreateCustomerReviewsDto,
} from './dto/create-customer-review.dto';
import { UpdateCustomerReviewDto } from './dto/update-customer-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerReview } from './entities/customer-review.entity';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { ErrorHandler } from 'src/common/errors/errors-handler';

@Injectable()
export class CustomerReviewsService {
  constructor(
    @InjectRepository(CustomerReview)
    private readonly customerReviewRepository: Repository<CustomerReview>,
  ) {}

  //in real life this one is the one to use cause per user they only can type for one review each time
  async createOne(
    createCustomerReviewDto: CreateCustomerReviewDto,
    product?: Product,
  ) {
    const customerReviewCreated = this.customerReviewRepository.create(
      createCustomerReviewDto,
    );

    const customerReviewSaved = await this.customerReviewRepository.save({
      ...customerReviewCreated,
    });
    return customerReviewSaved;
  }

  async createMany(
    createCustomerReviewsDto: CreateCustomerReviewsDto,
    product?: Product,
  ) {
    const customerReviewsCreated = createCustomerReviewsDto.customerReviews.map(
      (customerReview) => {
        return this.customerReviewRepository.create(customerReview);
      },
    );

    const customerReviewsToSave = customerReviewsCreated.map(
      (customerReview) => {
        return {
          ...customerReview,
          product: [product],
        };
      },
    );

    const customerReviewsSaved = await this.customerReviewRepository.save(
      customerReviewsToSave,
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
  async findByNano(nanoid: string) {
    const customerReview = await this.customerReviewRepository.findOne({
      where: {
        nanoid: nanoid,
      },
    });
    return customerReview;
    // find sending the whole objet
    /*

    the argument in the method should be review: Partial<CustomerReview>
    const whereOptions: Partial<FindOptionsWhere<CustomerReview>> = {};
   
    for (const key in review) {
      if (review[key] !== undefined) {
        whereOptions[key] = review[key];
      }
    }
    console.log(whereOptions);
    return await this.customerReviewRepository.findOne({ where: whereOptions });*/
  }

  update(id: number, updateCustomerReviewDto: UpdateCustomerReviewDto) {
    return `This action updates a #${id} customerReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerReview`;
  }

  async deleteAllCustomerReviews() {
    try {
      const query =
        this.customerReviewRepository.createQueryBuilder('customerReviews');
      return await query.delete().where({}).execute();
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }
}
