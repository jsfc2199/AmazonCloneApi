import { Injectable } from '@nestjs/common';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';
import { Repository } from 'typeorm';
import { CreditCard } from './entities/credit-card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ErrorHandler } from '../common/errors/errors-handler';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class CreditCardsService {
  constructor(
    @InjectRepository(CreditCard)
    private readonly creditCardRepository: Repository<CreditCard>,
  ) {}
  async create(
    createCreditCardDto: CreateCreditCardDto,
    user?: CreateUserDto,
  ): Promise<string> {
    try {
      const { creditCardPass, ...cardData } = createCreditCardDto;

      const card = this.creditCardRepository.create({
        ...cardData,
        creditCardPass: await bcrypt.hash(creditCardPass, 10),
        user: [user], //is an array because is many to many
      });

      const cardToSave = await this.creditCardRepository.save(card);

      return cardToSave.uuid;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  //!Changed to findOne because use findOneOrFail throws an error but in the link use and card if card not exists it is created
  async findByCardNumber(cardNumber: string): Promise<CreditCard> {
    try {
      const card = await this.creditCardRepository.findOne({
        where: {
          creditCardNumber: cardNumber,
        },
      });
      return card;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all creditCards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} creditCard`;
  }

  update(id: number, updateCreditCardDto: UpdateCreditCardDto) {
    return `This action updates a #${id} creditCard ${updateCreditCardDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} creditCard`;
  }

  async deleteAllCards() {
    try {
      const query =
        this.creditCardRepository.createQueryBuilder('credit-cards');
      return await query.delete().where({}).execute();
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }
}
