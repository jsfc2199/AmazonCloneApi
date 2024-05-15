import { MigrationInterface, QueryRunner } from 'typeorm';

export class MassiveMigration1715735915285 implements MigrationInterface {
  name = 'MassiveMigration1715735915285';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "credit_card" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "creditCardNumber" text NOT NULL, "creditCardPass" text NOT NULL, CONSTRAINT "UQ_c4793bc513a643eae0b02d1bf47" UNIQUE ("creditCardNumber"), CONSTRAINT "PK_f033c4807b5062f5175dfe2f92a" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" text NOT NULL, "city" text NOT NULL, "streetAddress" text NOT NULL, CONSTRAINT "PK_496d4a29b0dfa82ede19a4bcad0" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "identification" text NOT NULL, "name" text NOT NULL, "lastName" text, "email" text NOT NULL, "password" character varying NOT NULL, "phone" text, "cellphone" text, CONSTRAINT "UQ_140d91acc242af813ce91987621" UNIQUE ("identification"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "specification_highlight" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "feature" text NOT NULL, "featureDescription" text, "featureDisplayName" text NOT NULL, "assembledSpecs" text NOT NULL, "assembledDescription" text, "assembledDisplayName" text NOT NULL, CONSTRAINT "PK_4e4010e6b8d277815c53b031b9d" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "category" text NOT NULL, CONSTRAINT "UQ_dab3b9cd30b5940f3a808316991" UNIQUE ("category"), CONSTRAINT "PK_86ee096735ccbfa3fd319af1833" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "us_item_id" text NOT NULL, "product_id" text NOT NULL, "title" text NOT NULL, "short_description_html" text NOT NULL, "detailed_description_html" text NOT NULL, "seller_id" text NOT NULL, "seller_name" text NOT NULL, "product_type_id" text NOT NULL, "product_type" text NOT NULL, "manufacturer" text NOT NULL, "product_page_url" text NOT NULL, "min_quantity" integer NOT NULL, "max_quantity" integer NOT NULL, "in_stock" boolean NOT NULL DEFAULT false, "reviews" integer NOT NULL, "rating" numeric(3,2), "offer_id" text NOT NULL, "offer_type" "public"."products_offer_type_enum" NOT NULL, "price" numeric(10,2) NOT NULL, "was_price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, "specificationHighlightsUuid" uuid, CONSTRAINT "UQ_80ef502056867ac21c917f3ca52" UNIQUE ("us_item_id"), CONSTRAINT "UQ_a8940a4bf3b90bd7ac15c8f4dd9" UNIQUE ("product_id"), CONSTRAINT "UQ_b6682b8728db668621f25348970" UNIQUE ("product_page_url"), CONSTRAINT "UQ_afaa11fba6b54689a4033b5a861" UNIQUE ("offer_id"), CONSTRAINT "REL_154cbfd0eeb929fd7b9d0a33da" UNIQUE ("specificationHighlightsUuid"), CONSTRAINT "PK_98086f14e190574534d5129cd7c" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_image" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" text NOT NULL, CONSTRAINT "PK_1e0490de7d2b6b7ea905d688d89" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_cards" ("user_id" uuid NOT NULL, "credit_card_id" uuid NOT NULL, CONSTRAINT "PK_359bbf9d31185a8376e51d9fd45" PRIMARY KEY ("user_id", "credit_card_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ff014d8d02b6e24048708e3299" ON "users_cards" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b49ded3da124b92da5f5620fe7" ON "users_cards" ("credit_card_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users_addresses" ("user_id" uuid NOT NULL, "address_id" uuid NOT NULL, CONSTRAINT "PK_6fdf8905a58ed0f936d7e17e6e6" PRIMARY KEY ("user_id", "address_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a6de63ed9c7d202b9cadae024d" ON "users_addresses" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_74de4f43d79bc7d7cb5c20d770" ON "users_addresses" ("address_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "product_categories" ("product_item_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_4ca4676dc38ec60989f64ad1f45" PRIMARY KEY ("product_item_id", "category_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9c83b723f73b1984d0d4075cf2" ON "product_categories" ("product_item_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9148da8f26fc248e77a387e311" ON "product_categories" ("category_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "product_images" ("product_item_id" uuid NOT NULL, "image_id" uuid NOT NULL, CONSTRAINT "PK_0de564dd482479c23ebf67ee686" PRIMARY KEY ("product_item_id", "image_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_01bb93c3f87e2e1f33ff1368eb" ON "product_images" ("product_item_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2212515ba306c79f42c46a99db" ON "product_images" ("image_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_154cbfd0eeb929fd7b9d0a33da7" FOREIGN KEY ("specificationHighlightsUuid") REFERENCES "specification_highlight"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_cards" ADD CONSTRAINT "FK_ff014d8d02b6e24048708e32991" FOREIGN KEY ("user_id") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_cards" ADD CONSTRAINT "FK_b49ded3da124b92da5f5620fe7f" FOREIGN KEY ("credit_card_id") REFERENCES "credit_card"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_addresses" ADD CONSTRAINT "FK_a6de63ed9c7d202b9cadae024df" FOREIGN KEY ("user_id") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_addresses" ADD CONSTRAINT "FK_74de4f43d79bc7d7cb5c20d7705" FOREIGN KEY ("address_id") REFERENCES "address"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories" ADD CONSTRAINT "FK_9c83b723f73b1984d0d4075cf26" FOREIGN KEY ("product_item_id") REFERENCES "products"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories" ADD CONSTRAINT "FK_9148da8f26fc248e77a387e3112" FOREIGN KEY ("category_id") REFERENCES "category"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_images" ADD CONSTRAINT "FK_01bb93c3f87e2e1f33ff1368eb8" FOREIGN KEY ("product_item_id") REFERENCES "products"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_images" ADD CONSTRAINT "FK_2212515ba306c79f42c46a99db7" FOREIGN KEY ("image_id") REFERENCES "product_image"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_images" DROP CONSTRAINT "FK_2212515ba306c79f42c46a99db7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_images" DROP CONSTRAINT "FK_01bb93c3f87e2e1f33ff1368eb8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories" DROP CONSTRAINT "FK_9148da8f26fc248e77a387e3112"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories" DROP CONSTRAINT "FK_9c83b723f73b1984d0d4075cf26"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_addresses" DROP CONSTRAINT "FK_74de4f43d79bc7d7cb5c20d7705"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_addresses" DROP CONSTRAINT "FK_a6de63ed9c7d202b9cadae024df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_cards" DROP CONSTRAINT "FK_b49ded3da124b92da5f5620fe7f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_cards" DROP CONSTRAINT "FK_ff014d8d02b6e24048708e32991"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_154cbfd0eeb929fd7b9d0a33da7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2212515ba306c79f42c46a99db"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_01bb93c3f87e2e1f33ff1368eb"`,
    );
    await queryRunner.query(`DROP TABLE "product_images"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9148da8f26fc248e77a387e311"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9c83b723f73b1984d0d4075cf2"`,
    );
    await queryRunner.query(`DROP TABLE "product_categories"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_74de4f43d79bc7d7cb5c20d770"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a6de63ed9c7d202b9cadae024d"`,
    );
    await queryRunner.query(`DROP TABLE "users_addresses"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b49ded3da124b92da5f5620fe7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ff014d8d02b6e24048708e3299"`,
    );
    await queryRunner.query(`DROP TABLE "users_cards"`);
    await queryRunner.query(`DROP TABLE "product_image"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "specification_highlight"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "credit_card"`);
  }
}
