import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardsController } from './credit-cards.controller';
import { CreditCardsService } from './credit-cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../../ormconfig';
import { CreditCard } from './entities/credit-card.entity';

describe('CreditCardsController', () => {
  let controller: CreditCardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditCardsController],
      providers: [CreditCardsService],
      imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        TypeOrmModule.forFeature([CreditCard]),
      ],
    }).compile();

    controller = module.get<CreditCardsController>(CreditCardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
