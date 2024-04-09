import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from '../product.service';
import { CategoryService } from '../../category/category.service';
import { CreateCategoryDto } from '../../category/dto/create-category.dto';

@Injectable()
export class ProductCategoryUseCase {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  async createProductUseCase(
    productId: string,
    createCategoryDto: CreateCategoryDto,
  ) {
    const product = await this.productService.findOne(productId);
    const { categories } = product;
    const { category } = createCategoryDto;

    const doesCategoryExists = await this.categoryService.findOne(
      category.toUpperCase(),
    );

    if (!doesCategoryExists) {
      const newCategory = await this.categoryService.create(
        createCategoryDto,
        product,
      );
      return newCategory;
    }

    const existingCategory = doesCategoryExists.category;

    const productCategories = product.categories.map(
      (category) => category.category,
    );

    if (productCategories.includes(existingCategory)) {
      throw new BadRequestException(
        `The category ${existingCategory} is already associated to the product with id ${product.us_item_id}`,
      );
    }

    const newCategories = [...categories, doesCategoryExists];

    const productUpdated = await this.productService.update(productId, {
      categories: newCategories,
    });
    return {
      productUpdated,
    };
  }
}
