import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AddCardUseCase } from './usecases/add-card.use-case';
import { CreateCreditCardDto } from 'src/credit-cards/dto/create-credit-card.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly addCardUseCase: AddCardUseCase,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.userService.findAll(pagination);
  }

  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.userService.remove(uuid);
  }

  @Post(':uuid')
  borrar(@Body() createCard: CreateCreditCardDto, @Param('uuid') uuid: string) {
    return this.addCardUseCase.execute(uuid, createCard);
  }
}
