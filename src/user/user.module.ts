import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRelationsController } from './controllers/user-relations.controller';
import { UserCardRelationUseCase } from './use-cases/user-card-relation.use-cases';
import { CreditCardsModule } from '../credit-cards/credit-cards.module';

@Module({
  imports: [CreditCardsModule, TypeOrmModule.forFeature([User])], //needed to be able to use Repository and other TypeORM features inside this module
  controllers: [UserController, UserRelationsController],
  providers: [UserService, UserCardRelationUseCase],
})
export class UserModule {}
