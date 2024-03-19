import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
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
}
