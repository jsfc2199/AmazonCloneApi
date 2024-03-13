import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreditCardsService } from 'src/credit-cards/credit-cards.service';
import { CreateCreditCardDto } from '../../credit-cards/dto/create-credit-card.dto';

@Injectable()
export class AddCardUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly cardService: CreditCardsService,
  ) {}

  private readonly logger = new Logger();

  async execute(userUuid: string, createCardDto: CreateCreditCardDto) {
    try {
      const { creditCardNumber } = createCardDto;
      const user = await this.userService.findOne(userUuid); //ya existe el usuario porque se puede crear un usuario sin tener tarjeta asociada
      this.logger.log(`user found: ${user.uuid}`);
      const { creditCards } = user;

      const doesCardExists =
        await this.cardService.findByCardNumber(creditCardNumber);
      if (!doesCardExists) {
        const cardId = await this.cardService.create(createCardDto, user); //se crea la tarjeta si lo va a usar
        return cardId;
      }

      //el usuario que esta mandando la tarjeta, ya la tiene?
      const cardsNumbers = user.creditCards.map(
        (card) => card.creditCardNumber,
      );

      if (cardsNumbers.includes(creditCardNumber)) {
        throw new BadRequestException(
          `Credit card is already associated to the user`,
        );
      }

      await this.userService.update(userUuid, {
        creditCards: [...creditCards, doesCardExists],
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
