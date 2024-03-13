import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreditCardsModule } from 'src/credit-cards/credit-cards.module';
import { AddCardUseCase } from './usecases/add-card.use-case';

@Module({
  imports: [CreditCardsModule, TypeOrmModule.forFeature([User])], //needed to be able to use Repository and other TypeORM features inside this module
  controllers: [UserController],
  providers: [UserService, AddCardUseCase],
})
export class UserModule {}
