import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from '../product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductUseCase } from '../use-cases/product.use-case';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productUseCase: ProductUseCase,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productUseCase.createProductUseCase(createProductDto);
  }

  @Get()
  findAll(@Query() pagination?: PaginationDto) {
    return this.productService.findAll(pagination);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productService.findOne(term);
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productUseCase.updateProductUseCase(term, updateProductDto);
  }

  @Delete(':term')
  remove(@Param('term') term: string) {
    return this.productService.remove(term);
  }
}
