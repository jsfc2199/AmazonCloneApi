import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from '../product.service';
import { ProductImagesService } from '../../product-images/product-images.service';
import { CreateProductImageDto } from '../../product-images/dto/create-product-image.dto';
import { Product } from '../entities/product.entity';
import { ProductImage } from '../../product-images/entities/product-image.entity';

export interface Response {
  productId: string;
  images: string[];
}

@Injectable()
export class ProductImageUseCase {
  constructor(
    private readonly productService: ProductService,
    private readonly productImagesService: ProductImagesService,
  ) {}

  async linkProductImageUseCase(
    productId: string,
    createImageDto: CreateProductImageDto,
  ) {
    const product = await this.productService.findOne(productId);
    const { images } = product;
    const response: Response[] = [];

    await this.validateImagesInProduct(createImageDto, product);

    const { allImages, imageIsNull } = await this.processImagesAndLinkByCreate(
      createImageDto,
      product,
    );

    if (imageIsNull) {
      const combinesImages: ProductImage[] = [...images, ...allImages.flat()];

      response.push({
        productId,
        images: combinesImages.map((img) => img.url),
      });

      return response;
    }

    const combinesImages = [...images, ...allImages];
    const productToUpdate = await this.productService.update(productId, {
      images: combinesImages,
    });

    const { productUpdated } = productToUpdate;

    response.push({
      productId,
      images: productUpdated.images.map((img) => img.url),
    });

    return response;
  }

  private async validateImagesInProduct(
    createImageDto: CreateProductImageDto,
    product: Product,
  ) {
    const { images } = product;

    const imagesFoundInReq = await Promise.all(
      createImageDto.images.map(async (image) => {
        return await this.productImagesService.findOne(image);
      }),
    );

    const notNullImages = imagesFoundInReq.filter((img) => img !== null);
    const imagesIdsInProduct = images.map((img) => img.uuid);

    if (notNullImages.length > 0) {
      const imagesAlreadyExistsInProduct = [];
      for (const image of notNullImages) {
        if (imagesIdsInProduct.includes(image.uuid)) {
          imagesAlreadyExistsInProduct.push(image.url);
        }
      }
      if (imagesAlreadyExistsInProduct.length > 0) {
        throw new BadRequestException(
          `The images ${JSON.stringify(imagesAlreadyExistsInProduct)} are already associated to the product with id ${product.us_item_id}`,
        );
      }
    }
  }

  private async processImagesAndLinkByCreate(
    createImageDto: CreateProductImageDto,
    product: Product,
  ) {
    const allImages: ProductImage[] = [];
    let imageIsNull = false;

    for await (const image of createImageDto.images) {
      const doesImageExists = await this.productImagesService.findOne(image);

      const imagesDto: CreateProductImageDto = { images: [image] };

      if (!doesImageExists) {
        const newImage = (await this.productImagesService.create(
          imagesDto,
          product,
        )) as ProductImage[];

        newImage.forEach((image) => allImages.push(image));
        imageIsNull = true;
        continue;
      }

      allImages.push(doesImageExists);
    }
    return { allImages, imageIsNull };
  }
}
