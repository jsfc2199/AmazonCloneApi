import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
  })
  country: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
  })
  city: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  streetAddress: string;

  @ManyToMany(() => User, (user) => user.addresses)
  user: User[];

  @BeforeInsert()
  @BeforeUpdate()
  capitalize() {
    this.country = this.country.toUpperCase();
    this.city = this.city.toUpperCase();
    this.streetAddress = this.streetAddress.toUpperCase();
  }
}
