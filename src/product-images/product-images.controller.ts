import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { Product } from '../product/entities/product.entity';

@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Post()
  create(
    @Body() createProductImageDto: CreateProductImageDto,
    product?: Product,
  ) {
    return this.productImagesService.create(createProductImageDto, product);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productImagesService.findOne(term);
  }
}
