import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreditCardsService } from './credit-cards.service';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';

@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Post()
  create(@Body() createCreditCardDto: CreateCreditCardDto) {
    return this.creditCardsService.create(createCreditCardDto);
  }

  @Get()
  findAll() {
    return this.creditCardsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.creditCardsService.findOne(+uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateCreditCardDto: UpdateCreditCardDto) {
    return this.creditCardsService.update(+uuid, updateCreditCardDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.creditCardsService.remove(+uuid);
  }
}
