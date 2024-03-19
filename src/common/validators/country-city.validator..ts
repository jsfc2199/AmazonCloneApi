import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { countries } from '../countries/countries';

@ValidatorConstraint({ name: 'countryCityValidator', async: true })
@Injectable()
export class CountryCityValidator implements ValidatorConstraintInterface {
  private readonly validCountries = countries.map((c) => c.name.toUpperCase());

  validate(value: any): boolean | Promise<boolean> {
    const hasNumbers = value.match(/[-+]?\d+(\.\d+)?/);
    if (hasNumbers)
      throw new BadRequestException(`Country must have only letters`);

    const validCountryList = this.validCountries.join(', ');

    if (!this.validCountries.includes(value.toUpperCase()))
      throw new BadRequestException(
        `Country must be part of the whitelist: ${validCountryList}`,
      );
    return true;
  }
}
