import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

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

  @ManyToMany(() => Product, (product) => product.categories, {
    onDelete: 'CASCADE',
  })
  product: Product[];

  @BeforeUpdate()
  capitalize() {
    this.category = this.category.toUpperCase();
  }
}
