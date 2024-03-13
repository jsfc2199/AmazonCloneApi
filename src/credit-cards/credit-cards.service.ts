import { Injectable } from '@nestjs/common';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';
import { Repository } from 'typeorm';
import { CreditCard } from './entities/credit-card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ErrorHandler } from '../common/errors/errors-handler';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CreditCardsService {
  constructor(
    @InjectRepository(CreditCard)
    private readonly creditCardRepository: Repository<CreditCard>,
  ) {}
  async create(
    createCreditCardDto: CreateCreditCardDto,
    user?: User,
  ): Promise<string> {
    try {
      const { creditCardPass, ...cardData } = createCreditCardDto;

      const card = this.creditCardRepository.create({
        ...cardData,
        creditCardPass: await bcrypt.hash(creditCardPass, 10),
        user: [user],
      });

      const savedCard = await this.creditCardRepository.save(card);

      return savedCard.uuid;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  async findByCardNumber(creditCardNumber: string) {
    try {
      const card = await this.creditCardRepository.findOne({
        select: {
          creditCardNumber: true,
          creditCardPass: true,
        },
        where: {
          creditCardNumber,
        },
      });
      return card;
    } catch (error) {}
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
}
