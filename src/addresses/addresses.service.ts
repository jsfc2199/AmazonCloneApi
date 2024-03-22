import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandler } from '../common/errors/errors-handler';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  async create(createAddressDto: CreateAddressDto, user?: CreateUserDto) {
    try {
      const address = this.addressRepository.create(createAddressDto);
      const { city, country, streetAddress } = address;
      const addressToSave = await this.addressRepository.save({
        ...address,
        city: city.toUpperCase(),
        country: country.toUpperCase(),
        streetAddress: streetAddress.toUpperCase(),
        user: [user],
      });
      return addressToSave;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  //!Changed to findOne because use findOneOrFail throws an error but in the link use and address if card not exists it is created
  async findByAddressProps(addressDto: UpdateAddressDto) {
    try {
      const { city, country, streetAddress } = addressDto;
      const address = await this.addressRepository.findOne({
        where: {
          city: city.toUpperCase(),
          country: country.toUpperCase(),
          streetAddress: streetAddress.toUpperCase(),
        },
      });
      return address;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all addresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    console.log(updateAddressDto);
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }

  async deleteAllAddresses() {
    try {
      const query = this.addressRepository.createQueryBuilder('addresses');
      return await query.delete().where({}).execute();
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }
}
