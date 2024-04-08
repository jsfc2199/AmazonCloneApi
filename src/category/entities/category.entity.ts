import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  category: string;

  @BeforeInsert()
  capitalize() {
    this.category = this.category.toUpperCase();
  }
}
