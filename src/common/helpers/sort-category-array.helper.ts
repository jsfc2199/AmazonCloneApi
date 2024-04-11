import { Category } from '../../category/entities/category.entity';
export const sortCategoryHelper = (array: Category[]) => {
  array.sort((a, b) => a.category.localeCompare(b.category));
  return array;
};
