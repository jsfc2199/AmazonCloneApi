import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isStringNumberPositive', async: true })
@Injectable()
export class IsStringNumberPositive implements ValidatorConstraintInterface {
  validate(value: string): boolean | Promise<boolean> {
    const cardNumber = parseInt(value);
    if (cardNumber > 0) return true;
    return false;
  }
  defaultMessage?(): string {
    throw new BadRequestException(
      `Credit card number or pass must be string positive number`,
    );
  }
}
