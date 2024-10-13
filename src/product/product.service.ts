import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandler } from '../common/errors/errors-handler';
import { isUUID } from 'validator';
import { PaginationCriteriaDto } from '../common/dto/pagination.dto';

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

  async findAll(pagination: PaginationCriteriaDto) {
    try {
      const { limit = 10, offset = 0 } = pagination;
      const allProducts = await this.productRepository.find({
        take: limit,
        skip: offset,
      });
      return allProducts;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  async findByCriteria(paginationCriteria: PaginationCriteriaDto) {
    try {
      const productBuilder = this.productRepository.createQueryBuilder('prod');
      const { limit = 10, offset = 0, criteria, filter } = paginationCriteria;

      const isPriceCriteria = criteria === 'price';
      const filterCondition =
        isPriceCriteria && filter < 50 ? '< :filter' : '> :filter';
      const orderDirection = isPriceCriteria && filter < 50 ? 'ASC' : 'DESC';

      productBuilder
        .where(`${criteria} ${filterCondition}`, { filter })
        .orderBy(`${criteria}`, orderDirection)
        .take(limit)
        .skip(offset);

      return await productBuilder.getMany();
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  //TODO: Mejorar para usar ORM
  async fetchRandom(pagination: PaginationCriteriaDto) {
    const { limit = 10, offset = 0 } = pagination;

    const randomProducts = await this.productRepository
      .createQueryBuilder('product')
      .orderBy('RANDOM()') // Para PostgreSQL
      .skip(offset)
      .take(limit)
      .getMany();

    return randomProducts;
  }

  async findOne(term: string): Promise<Product> {
    let product: Product;
    try {
      if (isUUID(term)) {
        product = await this.productRepository.findOneOrFail({
          where: {
            uuid: term,
          },
          relations: {
            categories: true,
            images: true,
            specificationHighlights: true,
            customerReviews: true,
          },
        });
      } else {
        product = await this.searchProductByTermDifferentThanUUID(term);
      }
      product.categories.sort((a, b) => a.category.localeCompare(b.category));
      return product;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  /*
  ! Taking into account that I am assuming infinite products both methods UPDATE and REMOVE are not necessary. 
  ! Doing it just for practice 
  */

  async update(term: string, updateProductDto: UpdateProductDto) {
    let productDB: Product;
    try {
      if (isUUID(term)) {
        productDB = await this.productRepository.preload({
          uuid: term,
          ...updateProductDto,
        });
      } else {
        productDB = await this.searchProductByTermDifferentThanUUID(term);

        Object.assign(productDB, updateProductDto); //!Copy all values from all properties from the source object(update product) to a target object (productDB)
      }
      const productUpdated = await this.productRepository.save(productDB);

      return {
        productUpdated,
      };
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  async remove(term: string) {
    try {
      const product = await this.findOne(term);
      await this.productRepository.remove(product);
      return product.us_item_id;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  private async searchProductByTermDifferentThanUUID(term: string) {
    // TODO cambiar sin usar queryBuilder y probar
    const productBuilder = this.productRepository.createQueryBuilder('prod');
    const productDB = await productBuilder
      .where(
        'us_item_id = :us_item_id or product_id = :product_id or offer_id = :offer_id',
        {
          us_item_id: term,
          product_id: term,
          offer_id: term,
        },
      )
      .leftJoinAndSelect('prod.categories', 'prodCategories')
      .leftJoinAndSelect('prod.images', 'prodImages')
      .leftJoinAndSelect(
        'prod.specificationHighlights',
        'prodSpecificationHighlights',
      )
      .leftJoinAndSelect('prod.customerReviews', 'prodCustomerReviews')
      .getOneOrFail();
    return productDB;
  }

  async deleteAllProducts() {
    try {
      const query = this.productRepository.createQueryBuilder('users');
      return await query.delete().where({}).execute();
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }
}
