import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from '../product.service';
import { CategoryService } from '../../category/category.service';
import { CreateCategoryDto } from '../../category/dto/create-category.dto';
import { Product } from '../entities/product.entity';
import { Category } from '../../category/entities/category.entity';
import { sortCategoryHelper } from 'src/common/helpers/sort-category-array.helper';

export interface Response {
  productId: string;
  categories: string[];
}

@Injectable()
export class ProductCategoryUseCase {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  async linkProductCategoryUseCase(
    productId: string,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Response[]> {
    const product = await this.productService.findOne(productId);
    const { categories } = product;
    const response: Response[] = [];

    await this.validateCategoriesInProduct(createCategoryDto, product);

    const { allCategories, categoryIsNull } =
      await this.processCategoriesAndLinkByCreate(createCategoryDto, product);

    if (categoryIsNull) {
      const combinedCategories: Category[] = [
        ...categories,
        ...allCategories.flat(),
      ];
      const sortedCategories = sortCategoryHelper(combinedCategories);

      response.push({
        productId: productId,
        categories: sortedCategories.map((category) => category.category),
      });
      return response;
    }

    const combinedCategories = [...categories, ...allCategories];
    const sortedCategories = sortCategoryHelper(combinedCategories);

    const productToUpdate = await this.productService.update(productId, {
      categories: sortedCategories,
    });

    const { productUpdated } = productToUpdate;

    response.push({
      productId,
      categories: productUpdated.categories.map(
        (category) => category.category,
      ),
    });

    return response;
  }

  private async processCategoriesAndLinkByCreate(
    createCategoryDto: CreateCategoryDto,
    product: Product,
  ) {
    const allCategories: Category[] = [];
    let categoryIsNull = false;
    for await (const category of createCategoryDto.category) {
      const doesCategoryExists = await this.categoryService.findOne(
        category.toUpperCase(),
      );

      const categoriesDto: CreateCategoryDto = { category: [category] };
      if (!doesCategoryExists) {
        const newCategory = (await this.categoryService.create(
          categoriesDto,
          product,
        )) as Category[];

        newCategory.forEach((category) => allCategories.push(category));
        categoryIsNull = true;
        continue;
      }

      allCategories.push(doesCategoryExists);
    }
    return { allCategories, categoryIsNull };
  }

  private async validateCategoriesInProduct(
    createCategoryDto: CreateCategoryDto,
    product: Product,
  ) {
    const { categories } = product;
    const categoriesFound = await Promise.all(
      createCategoryDto.category.map(async (category) => {
        return await this.categoryService.findOne(category.toUpperCase());
      }),
    );

    const nonNullCategories = categoriesFound.filter(
      (category) => category !== null,
    );

    const categoriesInProductIds = categories.map((category) => category.uuid);

    if (nonNullCategories.length > 0) {
      const categoriesAlreadyExistsInProduct = [];
      for (const category of nonNullCategories) {
        if (categoriesInProductIds.includes(category.uuid)) {
          categoriesAlreadyExistsInProduct.push(category.category);
        }
      }
      if (categoriesAlreadyExistsInProduct.length > 0) {
        throw new BadRequestException(
          `The categories ${JSON.stringify(categoriesAlreadyExistsInProduct)} is already associated to the product with id ${product.us_item_id}`,
        );
      }
    }
  }
}
