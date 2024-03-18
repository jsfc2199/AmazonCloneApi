import { IsString, Matches } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\s#-]*$/, {
    message: 'Address must contain letters and numbers',
  })
  address: string;
}
