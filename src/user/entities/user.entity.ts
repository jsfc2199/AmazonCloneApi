import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    unique: true,
    type: 'text',
  })
  email: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  phone: string;

  //TODO: Apply encryption
  @Column({
    nullable: false,
    select: false, //If we do a find method, the password is not going to be shown in the response
  })
  password: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  address: string;

  @Column({
    nullable: true,
    unique: true,
    type: 'text',
  })
  creditCardNumber: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  creditCardPass: string;
}
