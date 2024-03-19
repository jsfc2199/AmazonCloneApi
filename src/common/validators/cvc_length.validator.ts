import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'cvcLengthValidator', async: true })
@Injectable()
export class CvcLengthValidator implements ValidatorConstraintInterface {
  validate(value: string): boolean | Promise<boolean> {
    const cardLength = value.length;
    if (cardLength === 3) return true;
    return false;
  }
  defaultMessage?(): string {
    throw new BadRequestException(`Credit card pass must be 3 numbers`);
  }
}
