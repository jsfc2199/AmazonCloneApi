import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ErrorHandler } from '../common/errors/errors-handler';
import { PaginationCriteriaDto } from '../common/dto/pagination.dto';

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

  async findAll(pagination: PaginationCriteriaDto) {
    try {
      const { limit, offset } = pagination;
      const allUsers = await this.userRepository.find({
        take: limit,
        skip: offset,
      });
      return allUsers;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  async findOne(uuid: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: {
          uuid,
        },
        relations: {
          creditCards: true,
          addresses: true,
        },
      });
      return user;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
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
    try {
      const userDeleted = await this.findOne(id);
      await this.userRepository.remove(userDeleted);
      return userDeleted;
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }

  async deleteAllUsers() {
    try {
      const query = this.userRepository.createQueryBuilder('users');
      return await query.delete().where({}).execute();
    } catch (error) {
      ErrorHandler.handleExceptions(error);
    }
  }
}
