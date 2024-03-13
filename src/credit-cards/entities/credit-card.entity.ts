import { User } from 'src/user/entities/user.entity';
import { PrimaryGeneratedColumn, Column, ManyToMany, Entity } from 'typeorm';

@Entity()
export class CreditCard {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    nullable: false,
    select: true, //
    unique: true,
    type: 'text',
  })
  creditCardNumber: string;

  @Column({
    nullable: false,
    select: true,
    type: 'text',
  })
  creditCardPass: string;

  //second argument is the field with the relation
  @ManyToMany(() => User, (user) => user.creditCards)
  user: User[];
}
