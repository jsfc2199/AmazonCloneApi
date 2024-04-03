import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OfferType } from '../interfaces/offer-type.interface';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    nullable: false,
    unique: true,
    type: 'text',
  })
  us_item_id: string;

  @Column({
    nullable: false,
    unique: true,
    type: 'text',
  })
  product_id: string;

  @Column({
    nullable: false,
    unique: false,
    type: 'text',
  })
  title: string;

  @Column({
    nullable: false,
    unique: false,
    type: 'text',
  })
  short_description_html: string;

  @Column({
    nullable: false,
    unique: false,
    type: 'text',
  })
  detailed_description_html: string;

  @Column({
    nullable: false,
    unique: false,
    type: 'text',
  })
  seller_id: string;

  @Column({
    nullable: false,
    unique: false,
    type: 'text',
  })
  seller_name: string;

  @Column({
    nullable: false,
    unique: false,
    type: 'text',
  })
  product_type_id: string;

  @Column({
    nullable: false,
    unique: false,
    type: 'text',
  })
  product_type: string;

  @Column({
    nullable: false,
    unique: false,
    type: 'text',
  })
  manufacturer: string;

  @Column({
    nullable: false,
    unique: true,
    type: 'text',
  })
  product_page_url: string;

  @Column({
    nullable: false,
    unique: false,
    type: 'int',
  })
  min_quantity: number;

  @Column({
    nullable: false,
    unique: false,
    type: 'int',
  })
  max_quantity: number;

  @Column({
    nullable: false,
    unique: false,
    type: 'boolean',
    default: false,
  })
  in_stock: boolean;

  @Column({
    nullable: false,
    unique: false,
    type: 'int',
  })
  reviews: number;

  @Column({
    nullable: true,
    unique: false,
    type: 'numeric',
    precision: 3,
    scale: 2,
  })
  rating?: number;

  @Column({
    nullable: false,
    unique: true,
    type: 'text',
  })
  offer_id: string;

  @Column({
    nullable: false,
    unique: false,
    type: 'enum',
    enum: OfferType,
  })
  offer_type: OfferType;

  @Column({
    nullable: false,
    unique: false,
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    nullable: false,
    unique: false,
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  was_price: number;

  @Column({
    nullable: false,
    unique: false,
    type: 'int',
  })
  quantity: number;

  //images: string[];
  //categories: string[];
  //variant_swatches?: VariantSwatch[];
  //specification_highlights: SpecificationHighlight[];
}
