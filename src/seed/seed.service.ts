import { Injectable } from '@nestjs/common';
import { AddressesService } from '../addresses/addresses.service';
import { UserService } from '../user/user.service';
import { CreditCardsService } from '../credit-cards/credit-cards.service';
import { initialData } from './data/seed.data';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCardRelationUseCase } from '../user/use-cases/user-card-relation.use-case';
import { UserAddressRelationUseCase } from '../user/use-cases/user-address-relation.use-case';
import { productData } from './data/product-parcial.data';
import { Product } from './../product/entities/product.entity';
import { ProductService } from '../product/product.service';
import { ProductCategoryUseCase } from '../product/use-cases/linkProductCategory.use-case';
import { CategoryService } from '../category/category.service';
import { CreateCategoryDto } from '../category/dto/create-category.dto';

@Injectable()
export class SeedService {
  constructor(
    private readonly userService: UserService,
    private readonly addressService: AddressesService,
    private readonly cardService: CreditCardsService,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly userCardUseCase: UserCardRelationUseCase,
    private readonly userAddressUseCase: UserAddressRelationUseCase,
    private readonly productCategoryUseCase: ProductCategoryUseCase,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async runSeed() {
    await this.userService.deleteAllUsers();
    await this.addressService.deleteAllAddresses();
    await this.cardService.deleteAllCards();
    await this.productService.deleteAllProducts();
    await this.categoryService.deleteAllCategories();

    const dbUsers = await this.insertUsers();
    const usersIds = dbUsers.map((user) => user.uuid);

    // Long way to make the seed
    // initialData.creditCards.forEach((card) => {
    //   const randomNumber = Math.floor(Math.random() * 15);
    //   const randomIdUser = usersIds[randomNumber];

    //   this.userCardUseCase.linkUserAndCard(randomIdUser, card);
    //   return null;
    // });

    // initialData.addresses.forEach((address) => {
    //   const randomNumber = Math.floor(Math.random() * 15);
    //   const randomIdUser = usersIds[randomNumber];

    //   this.userAddressUseCase.linkUserAndAddress(randomIdUser, address);
    //   return null;
    // });

    this.linkUserWithRelations(
      usersIds,
      initialData.creditCards,
      this.userCardUseCase.linkUserAndCard.bind(this.userCardUseCase),
    );

    this.linkUserWithRelations(
      usersIds,
      initialData.addresses,
      this.userAddressUseCase.linkUserAndAddress.bind(this.userAddressUseCase),
    );

    const dbProducts = await this.insertProducts();
    const productsIds = dbProducts.map((product) => product.us_item_id);
    const allCategoriesPerProduct = productData.categoriesPerProduct;

    for await (const id of productsIds) {
      const categorySeed: CreateCategoryDto = {
        category: allCategoriesPerProduct[0][id],
      };
      await this.productCategoryUseCase.linkProductCategoryUseCase(
        id,
        categorySeed,
      );
    }
    return 'Seed executed';
  }

  private async insertUsers(): Promise<User[]> {
    const seedUsers = initialData.users;
    const users: User[] = [];

    seedUsers.forEach((user) => users.push(this.userRepository.create(user)));
    return await this.userRepository.save(users);
  }

  private async insertProducts(): Promise<Product[]> {
    const seedProducts = productData.product_result;
    const products: Product[] = [];

    seedProducts.forEach((product) =>
      products.push(this.productRepository.create(product)),
    );
    return await this.productRepository.save(products);
  }

  private async linkUserWithRelations<T>(
    usersIds: string[],
    relation: T[],
    linkFunction: (userId: string, item: T) => void,
  ) {
    relation.forEach((relation) => {
      const randomNumber = Math.floor(Math.random() * 15);
      const randomIdUser = usersIds[randomNumber];
      linkFunction(randomIdUser, relation);
    });
  }

  // private async linkProductWithCategory():{

  // }
}
