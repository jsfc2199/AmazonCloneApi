import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from '../product.service';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductUseCase {
  constructor(private readonly productService: ProductService) {}

  async createProductUseCase(createProductDto: CreateProductDto) {
    const { max_quantity, quantity, was_price, price } = createProductDto;

    this.validateMaxQuantity(quantity, max_quantity);
    this.validatePrice(was_price, price);

    return this.productService.create(createProductDto);
  }

  private validatePrice(was_price: number, price: number) {
    if (was_price < price) {
      throw new BadRequestException(
        `Was Price: $${was_price} must be equal or greater than the official Price: $${price}`,
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
}
