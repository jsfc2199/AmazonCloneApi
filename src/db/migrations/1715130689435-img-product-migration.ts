import { MigrationInterface, QueryRunner } from 'typeorm';

export class ImgProductMigration1715130689435 implements MigrationInterface {
  name = 'ImgProductMigration1715130689435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_image" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" text NOT NULL, "productUuid" uuid, CONSTRAINT "UQ_cadac547ef3d7afbc58c7db3586" UNIQUE ("url"), CONSTRAINT "PK_1e0490de7d2b6b7ea905d688d89" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_image" ADD CONSTRAINT "FK_052e23bac21d0c764d61ee09dbc" FOREIGN KEY ("productUuid") REFERENCES "products"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_image" DROP CONSTRAINT "FK_052e23bac21d0c764d61ee09dbc"`,
    );
    await queryRunner.query(`DROP TABLE "product_image"`);
  }
}
