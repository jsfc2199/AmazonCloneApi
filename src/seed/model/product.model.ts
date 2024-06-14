import { OfferType } from '../../product/interfaces/offer-type.interface';

export interface SeedProductResult {
  us_item_id: string;
  product_id: string;
  title: string;
  short_description_html: string;
  detailed_description_html: string;
  seller_id: string;
  seller_name: string;
  product_type_id: string;
  product_type: string;
  manufacturer: string;
  product_page_url: string;
  min_quantity: number;
  max_quantity: number;
  in_stock: boolean;
  reviews: number;
  rating?: number;
  offer_id: string;
  offer_type: OfferType;
  price: number;
  was_price: number;
  quantity: number;
}

export interface SeedProductCategoriesAndImages {
  [productId: string]: string[];
}

export interface SeedProductSpecificationHighlights {
  [productId: string]: ProductFeatures;
}

export interface ProductFeatures {
  feature: string;
  featureDescription: string;
  featureDisplayName: string;
  assembledSpecs: string;
  assembledDescription: string;
  assembledDisplayName: string;
}

export interface CustomerReview {
  title?: string;
  text?: string;
  rating: number;
  review_submission_time: string;
  user_nickname?: string;
  nanoid?: string;
}

export interface SeedProductCustomerReview {
  [productId: string]: CustomerReview[];
}
