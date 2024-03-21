import { Controller, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { UserCardRelationUseCase } from '../use-cases/user-card-relation.use-case';
import { CreateCreditCardDto } from '../../credit-cards/dto/create-credit-card.dto';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { UserAddressRelationUseCase } from '../use-cases/user-address-relation.use-case';

@Controller('user-relations')
export class UserRelationsController {
  constructor(
    private readonly userCardUseCase: UserCardRelationUseCase,
    private readonly userAddressUseCase: UserAddressRelationUseCase,
  ) {}
  @Post('card/:uuid')
  createUserCardRelation(
    @Param('uuid', ParseUUIDPipe) userId: string,
    @Body() createCreditCardDto: CreateCreditCardDto,
  ) {
    return this.userCardUseCase.linkUserAndCard(userId, createCreditCardDto);
  }

  @Post('address/:uuid')
  createUserAddressRelation(
    @Param('uuid', ParseUUIDPipe) userId: string,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.userAddressUseCase.linkUserAndAddress(userId, createAddressDto);
  }
}
