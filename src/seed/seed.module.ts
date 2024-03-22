import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AddressesModule } from '../addresses/addresses.module';
import { CreditCardsModule } from '../credit-cards/credit-cards.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AddressesModule, CreditCardsModule, UserModule],
})
export class SeedModule {}
