import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandler } from '../common/errors/errors-handler';
import { isUUID } from 'validator';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      const productToSave = await this.productRepository.save(product);
      return productToSave;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(term: string) {
    try {
      if (isUUID(term)) {
        const product = await this.productRepository.findOneOrFail({
          where: {
            uuid: term,
          },
        });
        return product;
      } else {
        const productBuilder =
          this.productRepository.createQueryBuilder('prod');
        const product = await productBuilder
          .where(
            'us_item_id = :us_item_id or product_id = :product_id or offer_id = :offer_id',
            {
              us_item_id: term,
              product_id: term,
              offer_id: term,
            },
          )
          .getOneOrFail();
        return product;
      }
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
