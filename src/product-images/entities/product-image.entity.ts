import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'text',
    unique: false,
    nullable: false,
  })
  url: string;

  @ManyToMany(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: Product[];
}
