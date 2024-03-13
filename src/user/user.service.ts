import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ErrorHandler } from 'src/common/errors/errors-handler';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: await bcrypt.hash(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      return {
        user,
      };
    } catch (error: any) {
      ErrorHandler.handleExceptions(error);
    }
  }

  async findAll(pagination: PaginationDto) {
    const { limit, offset } = pagination;
    const allUsers = await this.userRepository.find({
      take: limit,
      skip: offset,
    });
    return allUsers;
  }

  async findOne(uuid: string) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: {
          uuid,
        },
        relations: {
          creditCards: true,
        },
      });
      return user;
    } catch (e) {
      throw new NotFoundException(`No user found with id: ${uuid}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      //https://typeorm.io/sequelize-migration#working-with-models
      //if you want to load an existing entity from the database and replace some of its properties you can use the following method (preload)
      const userDB = await this.userRepository.preload({
        uuid: id,
        ...updateUserDto,
      });
      if (!userDB)
        throw new NotFoundException(`User with id ${id} does not exist`);
      const userUpdated = await this.userRepository.save(userDB);
      delete userUpdated.password;
      return {
        userUpdated,
      };
    } catch (error: any) {
      ErrorHandler.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const userDeleted = await this.findOne(id);
    await this.userRepository.remove(userDeleted);
    return userDeleted;
  }
}
