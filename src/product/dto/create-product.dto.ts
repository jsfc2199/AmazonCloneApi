import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { OfferType } from '../interfaces/offer-type.interface';
import { Category } from '../../category/entities/category.entity';
import { ProductImage } from 'src/product-images/entities/product-image.entity';

export class CreateProductDto {
  @IsNumberString()
  us_item_id: string;

  @IsString()
  product_id: string;

  @IsString()
  title: string;

  @IsString()
  short_description_html: string;

  @IsString()
  detailed_description_html: string;

  @IsString()
  seller_id: string;

  @IsString()
  seller_name: string;

  @IsString()
  product_type_id: string;

  @IsString()
  product_type: string;

  @IsString()
  manufacturer: string;

  @IsString()
  product_page_url: string;

  @IsNumber()
  @Min(0)
  min_quantity: number;

  @IsNumber()
  @IsPositive()
  max_quantity: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsBoolean()
  in_stock: boolean;

  @IsNumber()
  @IsInt()
  @Min(0)
  reviews: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  rating?: number;

  @IsString()
  offer_id: string;

  @IsEnum(OfferType, {
    message: 'Offer type must be either ONLINE_AND_STORE or ONLINE_ONLY',
  })
  offer_type: OfferType;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  was_price: number;

  @IsOptional()
  categories?: Category[];

  @IsOptional()
  images?: ProductImage[];
}
