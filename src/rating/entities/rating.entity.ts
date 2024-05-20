import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'float',
    nullable: true,
    unique: false,
  })
  rating?: number;

  @Column({
    type: 'int',
    nullable: true,
    unique: false,
  })
  count: number;

  //relación entre rating y review
  @OneToMany(() => Review, (review) => review.productRating, {
    cascade: true,
    eager: true,
  })
  customer_reviews?: Review[];
}
