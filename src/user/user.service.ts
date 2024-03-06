import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');
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
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
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
      this.handleExceptions(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(`Error: ${error.detail}`);
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error. Check logs');
  }
}
