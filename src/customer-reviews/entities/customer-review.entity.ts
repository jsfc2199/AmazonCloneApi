import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class CustomerReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
  })
  title?: string;

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
  })
  text?: string;

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
  user_nickname?: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  nanoid?: string;

  @ManyToMany(() => Product, (product) => product.customerReviews, {
    onDelete: 'CASCADE',
  })
  product: Product[];

  @BeforeInsert()
  async generateNanoid() {
    const { customAlphabet } = await import('nanoid');
    const alphabet =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const nanoid = customAlphabet(alphabet, 20);
    if (!this.nanoid) this.nanoid = nanoid(20);
  }
}
