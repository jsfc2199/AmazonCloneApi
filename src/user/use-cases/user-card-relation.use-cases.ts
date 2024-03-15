import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreditCardsService } from '../../credit-cards/credit-cards.service';
import { CreateCreditCardDto } from 'src/credit-cards/dto/create-credit-card.dto';

@Injectable()
export class UserCardRelationUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly cardService: CreditCardsService,
  ) {}

  private readonly logger: Logger = new Logger();
  async linkUserAndCard(userId: string, card: CreateCreditCardDto) {
    try {
      //at this point user must be already in users table
      const user = await this.userService.findOne(userId);
      const { creditCards } = user;

      const { creditCardNumber } = card;
      const doesCardExist =
        await this.cardService.findByCardNumber(creditCardNumber);

      //si no existe la tarjeta la creo y la relaciono de una vez
      if (!doesCardExist) {
        const newCard = await this.cardService.create(card, user);
        return newCard;
      }

      const userCardsNumbers = user.creditCards.map(
        (card) => card.creditCardNumber,
      );

      if (userCardsNumbers.includes(creditCardNumber)) {
        throw new BadRequestException(
          `The card number ${creditCardNumber} is already associated to the user with id ${user.uuid}`,
        );
      }

      const newCards = [...creditCards, doesCardExist];

      const userUpdated = await this.userService.update(userId, {
        //only creditCards are sent because updateUserDto all properties are optional
        creditCards: newCards,
      });
      return userUpdated;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
