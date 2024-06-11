import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CustomerReviewsService } from './customer-reviews.service';
import { CreateCustomerReviewDto, CreateCustomerReviewsDto } from './dto/create-customer-review.dto';
import { UpdateCustomerReviewDto } from './dto/update-customer-review.dto';

@Controller('customer-reviews')
export class CustomerReviewsController {
  constructor(
    private readonly customerReviewsService: CustomerReviewsService,
  ) {}

  @Post()
  create(@Body() createCustomerReviewDto: CreateCustomerReviewDto) {
    return this.customerReviewsService.createOne(createCustomerReviewDto);
  }

  @Post('many')
  createMany(@Body() createCustomerReviewDto: CreateCustomerReviewsDto) {
    return this.customerReviewsService.createMany(createCustomerReviewDto);
  }

  @Get()
  findAll() {
    return this.customerReviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.customerReviewsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerReviewDto: UpdateCustomerReviewDto,
  ) {
    return this.customerReviewsService.update(+id, updateCustomerReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerReviewsService.remove(+id);
  }
}
