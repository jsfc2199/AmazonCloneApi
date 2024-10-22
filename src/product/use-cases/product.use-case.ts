import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from '../product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PaginationCriteriaDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductUseCase {
  constructor(private readonly productService: ProductService) {}

  async createProductUseCase(createProductDto: CreateProductDto) {
    const { max_quantity, quantity, was_price, price } = createProductDto;

    this.validateMaxQuantity(quantity, max_quantity);
    this.validatePrice(was_price, price);

    return this.productService.create(createProductDto);
  }

  //TODO: Fetch random and criteria use cases
  async getProductsByCriteriaUseCase(
    paginationCriteria: PaginationCriteriaDto,
  ) {
    const { limit = 10, criteria, filter } = paginationCriteria;

    const { filterCondition, orderDirection } = this.getFilteredCondition(
      criteria,
      filter,
    );

    return this.productService.findByCriteria(
      limit,
      filterCondition,
      orderDirection,
      criteria,
      filter,
    );
  }
  async updateProductUseCase(id: string, updateProductDto: UpdateProductDto) {
    const productDB = await this.productService.findOne(id);
    const { max_quantity, was_price } = productDB;

    if (updateProductDto.price) {
      this.validatePrice(was_price, updateProductDto.price);
    }

    if (updateProductDto.quantity) {
      this.validateMaxQuantity(updateProductDto.quantity, max_quantity);
    }

    return this.productService.update(id, updateProductDto);
  }

  private validatePrice(was_price: number, price: number) {
    if (was_price < price) {
      throw new BadRequestException(
        `Was Price must be equal or greater than the official Price or Price must be less than Was Price. Was Price: ${was_price}; Price: ${price}`,
      );
    }
  }

  private validateMaxQuantity(quantity: number, max_quantity: number) {
    if (quantity > max_quantity) {
      throw new BadRequestException(
        `Quantity: ${quantity}, must be less than Maximum Quantity: ${max_quantity}`,
      );
    }
  }

  private getFilteredCondition(criteria: string, filter: number) {
    const criteriaWhitelist = ['price', 'rating', 'reviews'];
    const criteriaFix = criteria.toLowerCase().trim();

    if (!criteriaWhitelist.includes(criteriaFix)) {
      throw new BadRequestException(
        `Criteria: '${criteria}' not allowed. Should be 'price', 'rating', 'reviews'`,
      );
    }
    const isPriceCriteria = criteria === 'price';

    const filterCondition =
      isPriceCriteria && filter < 50 ? '< :filter' : '> :filter';

    const orderDirection: 'ASC' | 'DESC' =
      isPriceCriteria && filter < 50 ? 'ASC' : 'DESC';

    return { filterCondition, orderDirection };
  }
}
