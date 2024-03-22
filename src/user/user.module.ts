import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRelationsController } from './controllers/user-relations.controller';
import { UserCardRelationUseCase } from './use-cases/user-card-relation.use-case';
import { CreditCardsModule } from '../credit-cards/credit-cards.module';
import { AddressesModule } from '../addresses/addresses.module';
import { UserAddressRelationUseCase } from './use-cases/user-address-relation.use-case';

@Module({
  imports: [
    AddressesModule,
    CreditCardsModule,
    TypeOrmModule.forFeature([User]),
  ], //needed to be able to use Repository and other TypeORM features inside this module
  controllers: [UserController, UserRelationsController],
  providers: [UserService, UserCardRelationUseCase, UserAddressRelationUseCase],
  exports: [
    UserService,
    TypeOrmModule,
    UserCardRelationUseCase,
    UserAddressRelationUseCase,
  ],
})
export class UserModule {}
