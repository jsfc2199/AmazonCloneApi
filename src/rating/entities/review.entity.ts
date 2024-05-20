import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Rating } from './rating.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
  })
  text: string;

  @Column({
    type: 'float',
    nullable: true,
    unique: false,
  })
  rating?: number;

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
  })
  review_submission_time: string;

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
  })
  user_nickname: string;

  //relación entre rating y review
  @ManyToOne(() => Rating, (rating) => rating.customer_reviews, {
    onDelete: 'CASCADE',
  })
  productRating: Rating;
}
