import { IsString, Matches, Validate } from 'class-validator';
import { CountryCityValidator } from '../../common/validators/country-city.validator.';

export class CreateAddressDto {
  @IsString()
  @Validate(CountryCityValidator)
  country: string;

  @IsString()
  @Matches(/^[A-Za-z]+$/, {
    message: 'City must have only letters',
  })
  city: string;

  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\s#-]*$/, {
    message: 'Address must contain letters and numbers',
  })
  streetAddress: string;
}
