import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from '../product.service';
import { CustomerReviewsService } from '../../customer-reviews/customer-reviews.service';
import { CreateCustomerReviewsDto } from '../../customer-reviews/dto/create-customer-review.dto';
import { Product } from '../entities/product.entity';
import { CustomerReview } from '../../customer-reviews/entities/customer-review.entity';

export interface ParcialCustomerReview {
  title: string;
  text: string;
  rating: number;
  user_nickname: string;
  review_submission_time: string;
}
export interface Response {
  productId: string;
  customerReviews: ParcialCustomerReview[];
}
@Injectable()
export class ProductCustomerReviewsUseCase {
  constructor(
    private readonly productService: ProductService,
    private readonly customerReviewService: CustomerReviewsService,
  ) {}

  async linkProductCustomerReviewUseCase(
    productId: string,
    customersReviews: CreateCustomerReviewsDto,
  ) {
    const response: Response[] = [];
    const product = await this.productService.findOne(productId);
    const { customerReviews } = product;

    await this.validateCustomerReviewsInProduct(product, customersReviews);

    const { allCustomerReviews, customerReviewIsNull } =
      await this.processCustomerReviewsAndLinkByCreate(
        product,
        customersReviews,
      );

    if (customerReviewIsNull) {
      const combinedCustomerReviews = [
        ...customerReviews,
        ...allCustomerReviews,
      ];
      const onlyCustomerReviewsAssociated = combinedCustomerReviews.map(
        (customerReview) => {
          const { title, text, rating, user_nickname, review_submission_time } =
            customerReview;
          return {
            title,
            text,
            rating,
            user_nickname,
            review_submission_time,
          };
        },
      );
      response.push({
        productId: productId,
        customerReviews: onlyCustomerReviewsAssociated,
      });
      return response;
    }

    const combinedCustomerReviews = [...customerReviews, ...allCustomerReviews];

    const productToUpdate = await this.productService.update(productId, {
      customerReviews: combinedCustomerReviews,
    });

    const { productUpdated } = productToUpdate;

    response.push({
      productId,
      customerReviews: productUpdated.customerReviews.map((customerReview) => {
        const { title, text, rating, user_nickname, review_submission_time } =
          customerReview;
        return {
          title,
          text,
          rating,
          user_nickname,
          review_submission_time,
        };
      }),
    });
  }

  private async processCustomerReviewsAndLinkByCreate(
    product: Product,
    customersReviews: CreateCustomerReviewsDto,
  ) {
    const allCustomerReviews: CustomerReview[] = [];
    let customerReviewIsNull = false;

    for await (const customerReview of customersReviews.customer_reviews) {
      const doesCustomerReviewExists =
        await this.customerReviewService.findByNano(customerReview.nanoid);

      const customerReviewsDto: CreateCustomerReviewsDto = {
        customer_reviews: [customerReview],
      };

      if (!doesCustomerReviewExists) {
        const newCustomerReview = (await this.customerReviewService.createMany(
          customerReviewsDto,
          product,
        )) as CustomerReview[];

        newCustomerReview.forEach((customerReview) =>
          allCustomerReviews.push(customerReview),
        );
        customerReviewIsNull = true;
        continue;
      }
      allCustomerReviews.push(doesCustomerReviewExists);
    }
    return { allCustomerReviews, customerReviewIsNull };
  }

  private async validateCustomerReviewsInProduct(
    product: Product,
    customersReviews: CreateCustomerReviewsDto,
  ) {
    const { customerReviews } = product;

    const customerReviewsFound = await Promise.all(
      customersReviews.customer_reviews.map(async (customerReview) => {
        return await this.customerReviewService.findByNano(
          customerReview.nanoid,
        );
      }),
    );

    const nonNullCustomerReviews = customerReviewsFound.filter(
      (customerReview) => customerReview !== null,
    );

    const customerReviewsIdsInProducts = customerReviews.map(
      (customerReview) => customerReview.id,
    );

    if (nonNullCustomerReviews.length > 0) {
      const customerReviewsAlreadyExistsInProduct = [];
      for (const customerReview of nonNullCustomerReviews) {
        if (customerReviewsIdsInProducts.includes(customerReview.id)) {
          customerReviewsAlreadyExistsInProduct.push(customerReview.id);
        }
      }
      if (customerReviewsAlreadyExistsInProduct.length > 0) {
        throw new BadRequestException(
          `The customer reviews ${JSON.stringify(customerReviewsAlreadyExistsInProduct)} is/are already associated to the product with id ${product.us_item_id}`,
        );
      }
    }
  }
}
