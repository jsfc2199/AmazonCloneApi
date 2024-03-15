import { Controller, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { UserCardRelationUseCase } from '../use-cases/user-card-relation.use-cases';
import { CreateCreditCardDto } from 'src/credit-cards/dto/create-credit-card.dto';

@Controller('user-relations')
export class UserRelationsController {
  constructor(private readonly userCardUseCase: UserCardRelationUseCase) {}

  @Post('card/:uuid')
  createUserCardRelation(
    @Param('uuid', ParseUUIDPipe) userId: string,
    @Body() createCreditCardDto: CreateCreditCardDto,
  ) {
    return this.userCardUseCase.linkUserAndCard(userId, createCreditCardDto);
  }
}
