import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ErrorHandler } from '../common/errors/errors-handler';
import { isUUID } from 'validator';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto, product?: Product) {
    try {
      const categoriesCreated = createCategoryDto.category.map((category) => {
        return this.categoryRepository.create({
          category: category.toUpperCase(),
        });
      });

      const categoriesToSave = categoriesCreated.map((category) => {
        return {
          ...category,
          product: [product],
        };
      });
      const categoriesSaved =
        await this.categoryRepository.save(categoriesToSave);

      return categoriesSaved;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all category`;
  }

  async findOne(term: string) {
    try {
      if (isUUID(term)) {
        const category = await this.categoryRepository.findOne({
          where: {
            uuid: term,
          },
        });
        return category;
      } else {
        const categoryBuilder =
          this.categoryRepository.createQueryBuilder('cat');
        const category = await categoryBuilder
          .where('category = :category', {
            category: term,
          })
          .getOne();
        return category;
      }
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  async deleteAllCategories() {
    try {
      const query = this.categoryRepository.createQueryBuilder('category');
      return await query.delete().where({}).execute();
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }
}
