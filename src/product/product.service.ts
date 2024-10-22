import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { In, Repository } from 'typeorm';
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

  async findByCriteria(
    limit: number,
    filterCondition: string,
    orderDirection: 'ASC' | 'DESC',
    criteria: string,
    filter: number,
  ) {
    try {
      const ids: string[] = (
        await this.productRepository
          .createQueryBuilder('prod')
          .select(`DISTINCT ON (prod.${criteria}) prod.uuid`)
          .where(`prod.${criteria} ${filterCondition}`, { filter })
          .orderBy(`prod.${criteria}`, orderDirection)
          .limit(limit)
          .getRawMany()
      ) //.getRawMany() Allow to use pure SQL like DISTINCT ON
        .map((id) => id.uuid);

      if (ids.length === 0) return [];

      const products = await this.getProductsByIdsAndCriteria(
        ids,
        criteria,
        orderDirection,
      );

      return products;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  async fetchRandom(limit: number) {
    try {
      const idsDB = await this.productRepository
        .createQueryBuilder('prod')
        .select('prod.uuid')
        .orderBy('RANDOM()')
        .take(limit)
        .getMany();

      const ids = idsDB.map((id) => id.uuid);

      const randomProducts = await this.getProductsByIdsAndCriteria(ids);

      return randomProducts;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
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

  private async getProductsByIdsAndCriteria(
    ids: string[],
    criteria?: string,
    orderDirection?: 'ASC' | 'DESC',
  ): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: { uuid: In(ids) },
      relations: {
        images: true,
      },
      order: criteria ? { [criteria]: orderDirection } : undefined,
    });

    return products;
  }
}
