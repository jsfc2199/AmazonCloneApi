import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from '../product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductUseCase {
  constructor(private readonly productService: ProductService) {}

  async createProductUseCase(createProductDto: CreateProductDto) {
    const { max_quantity, quantity, was_price, price } = createProductDto;

    this.validateMaxQuantity(quantity, max_quantity);
    this.validatePrice(was_price, price);

    return this.productService.create(createProductDto);
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
}
