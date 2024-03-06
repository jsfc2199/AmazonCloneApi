import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(6)
  @IsString()
  identification: string;

  @MinLength(3)
  @IsString()
  name: string;

  @MinLength(3)
  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  //!Necessary when the user is going to buy
  @IsString()
  @IsOptional()
  phone?: string;

  //!Necessary when the user is going to buy
  @IsString()
  @IsOptional()
  cellphone?: string;
}
