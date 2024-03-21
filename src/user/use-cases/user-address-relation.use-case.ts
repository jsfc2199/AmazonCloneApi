import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { AddressesService } from '../../addresses/addresses.service';
import { isEqual } from 'lodash';
@Injectable()
export class UserAddressRelationUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly addressService: AddressesService,
  ) {}

  async linkUserAndAddress(userId: string, address: CreateAddressDto) {
    const user = await this.userService.findOne(userId);
    const { addresses } = user;

    const doesAddressExists =
      await this.addressService.findByAddressProps(address);

    if (!doesAddressExists) {
      const newAddress = await this.addressService.create(address, user);
      return {
        city: newAddress.city,
        country: newAddress.country,
        streetAddress: newAddress.streetAddress,
      };
    }

    const { city, country, streetAddress } = doesAddressExists;
    const doesAddressExistsUpperCase: CreateAddressDto = {
      country: country.toUpperCase(),
      city: city.toUpperCase(),
      streetAddress: streetAddress.toUpperCase(),
    };

    const userAddresses: CreateAddressDto[] = user.addresses.map((c) => {
      const userCity = c.city;
      const userCountry = c.country;
      const userStreetAddress = c.streetAddress;
      return {
        country: userCountry,
        city: userCity,
        streetAddress: userStreetAddress,
      };
    });

    const doesTheUserAlreadyHaveTheAddress =
      this.doesAddressExistsInUserAddresses(
        userAddresses,
        doesAddressExistsUpperCase,
      );
    if (doesTheUserAlreadyHaveTheAddress) {
      throw new BadRequestException(
        `The address: Country - ${doesAddressExistsUpperCase.country}, City - ${doesAddressExistsUpperCase.city}, Street Address - ${doesAddressExistsUpperCase.streetAddress}, is already associated to the user with id ${user.uuid}`,
      );
    }

    const newAddresses = [...addresses, doesAddressExists];
    const userUpdated = await this.userService.update(userId, {
      addresses: newAddresses,
    });
    return userUpdated;
  }

  private doesAddressExistsInUserAddresses(
    addressArray: CreateAddressDto[],
    newAddress: CreateAddressDto,
  ): boolean {
    for (const address of addressArray) {
      const { city, country, streetAddress } = address;
      const addressUpperCase: CreateAddressDto = {
        country: country.toUpperCase(),
        city: city.toUpperCase(),
        streetAddress: streetAddress.toUpperCase(),
      };
      if (isEqual(addressUpperCase, newAddress)) {
        return true;
      }
    }
    return false;
  }
}
