import { IsString, Length, Matches, MinLength } from 'class-validator';
export class CreateCreditCardDto {
  @IsString()
  @MinLength(10)
  @Matches(/^\d+$/, {
    message: 'Credit Card Number must be only numbers',
  })
  creditCardNumber: string;

  @IsString()
  @Length(3, 3)
  @Matches(/^\d+$/, {
    message: 'CVC must be only numbers',
  })
  creditCardPass: string;
}
