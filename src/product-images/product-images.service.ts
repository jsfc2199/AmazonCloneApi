import { Injectable } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { Product } from '../product/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';
import { Repository } from 'typeorm';
import { ErrorHandler } from 'src/common/errors/errors-handler';
import { isUUID } from 'validator';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly imageRepository: Repository<ProductImage>,
  ) {}

  async create(
    createProductImageDto: CreateProductImageDto,
    product?: Product,
  ) {
    try {
      const imagesCreated = createProductImageDto.images.map((url) => {
        return this.imageRepository.create({
          url,
        });
      });

      const imagesToSave = imagesCreated.map((image) => {
        return {
          ...image,
          product: [product],
        };
      });

      const imagesSaved = await this.imageRepository.save(imagesToSave);

      return imagesSaved;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  // findAll() {
  //   return `This action returns all productImages`;
  // }

  async findOne(term: string) {
    try {
      if (isUUID(term)) {
        const image = await this.imageRepository.findOne({
          where: {
            uuid: term,
          },
        });
        return image;
      }
      const imageBuilder = this.imageRepository.createQueryBuilder('img');
      const image = await imageBuilder
        .where('url = :url', {
          url: term,
        })
        .getOne();
      return image;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  // update(id: number, updateProductImageDto: UpdateProductImageDto) {
  //   return `This action updates a #${id} productImage`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} productImage`;
  // }

  async deleteAllImages() {
    try {
      const query = this.imageRepository.createQueryBuilder('image');
      return await query.delete().where({}).execute();
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }
}
