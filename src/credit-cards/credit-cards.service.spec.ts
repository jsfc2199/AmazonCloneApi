import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardsService } from './credit-cards.service';
import { CreditCard } from './entities/credit-card.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const card = new CreditCard();
card.creditCardNumber = '123456789';

describe('CreditCardsService', () => {
  let cardService: CreditCardsService;
  let cardrRepositoryMock: Repository<CreditCard>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditCardsService,
        {
          provide: getRepositoryToken(CreditCard),
          useValue: {
            findOne: jest.fn().mockResolvedValue(card),
          },
        },
      ],
    }).compile();

    cardService = module.get<CreditCardsService>(CreditCardsService);
    cardrRepositoryMock = module.get(getRepositoryToken(CreditCard));
  });

  it('should be defined', () => {
    expect(cardService).toBeDefined();
  });
});
