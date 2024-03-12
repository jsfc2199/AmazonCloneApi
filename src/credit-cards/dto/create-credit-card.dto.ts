import { IsString, MinLength, Validate } from 'class-validator';
import {
  IsStringNumberPositive,
  CvcLengthValidator,
} from '../../common/validators';

export class CreateCreditCardDto {
  @MinLength(10)
  @IsString()
  @Validate(IsStringNumberPositive)
  creditCardNumber: string;

  @IsString()
  @Validate(IsStringNumberPositive)
  @Validate(CvcLengthValidator)
  creditCardPass: string;
}
