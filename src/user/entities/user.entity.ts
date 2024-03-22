import {
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreditCard } from '../../credit-cards/entities/credit-card.entity';
import { Address } from '../../addresses/entities/address.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    nullable: false,
    unique: true,
    type: 'text',
  })
  identification: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  name: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  lastName: string;

  @Column({
    nullable: false,
    unique: false,
    type: 'text',
  })
  email: string;

  @Column({
    nullable: false,
    select: false, //If we do a find method, the password is not going to be shown in the response
  })
  password: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  phone: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  cellphone: string;

  //second argument is the field with the relation
  @ManyToMany(() => CreditCard, (creditCard) => creditCard.user, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'users_cards', //table name
    joinColumn: {
      name: 'user_id', //column name (for this entity)
    },
    inverseJoinColumn: {
      name: 'credit_card_id', //column name (for the other entity)
    },
  })
  creditCards?: CreditCard[];

  @ManyToMany(() => Address, (address) => address.user)
  @JoinTable({
    name: 'users_addresses',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'address_id',
    },
  })
  addresses?: Address[];

  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
