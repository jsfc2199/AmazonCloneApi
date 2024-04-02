import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductEntity1712022497579 implements MigrationInterface {
  name = 'ProductEntity1712022497579';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "us_item_id" text NOT NULL, "product_id" text NOT NULL, "title" text NOT NULL, "short_description_html" text NOT NULL, "detailed_description_html" text NOT NULL, "seller_id" text NOT NULL, "seller_name" text NOT NULL, "product_type_id" text NOT NULL, "product_type" text NOT NULL, "manufacturer" text NOT NULL, "product_page_url" text NOT NULL, "min_quantity" integer NOT NULL, "max_quantity" integer NOT NULL, "in_stock" boolean NOT NULL DEFAULT false, "reviews" integer NOT NULL, "rating" numeric(3,2), "offer_id" text NOT NULL, "offer_type" "public"."products_offer_type_enum" NOT NULL, "price" numeric(10,2) NOT NULL, "was_price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "UQ_80ef502056867ac21c917f3ca52" UNIQUE ("us_item_id"), CONSTRAINT "UQ_a8940a4bf3b90bd7ac15c8f4dd9" UNIQUE ("product_id"), CONSTRAINT "UQ_b6682b8728db668621f25348970" UNIQUE ("product_page_url"), CONSTRAINT "UQ_594ca159cc17128d062999845f9" UNIQUE ("in_stock"), CONSTRAINT "UQ_afaa11fba6b54689a4033b5a861" UNIQUE ("offer_id"), CONSTRAINT "PK_98086f14e190574534d5129cd7c" PRIMARY KEY ("uuid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
