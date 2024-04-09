import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryProdyctManyToMany1712629393996 implements MigrationInterface {
    name = 'CategoryProdyctManyToMany1712629393996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "category" text NOT NULL, CONSTRAINT "UQ_dab3b9cd30b5940f3a808316991" UNIQUE ("category"), CONSTRAINT "PK_86ee096735ccbfa3fd319af1833" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "product_categories" ("product_item_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_4ca4676dc38ec60989f64ad1f45" PRIMARY KEY ("product_item_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9c83b723f73b1984d0d4075cf2" ON "product_categories" ("product_item_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9148da8f26fc248e77a387e311" ON "product_categories" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_9c83b723f73b1984d0d4075cf26" FOREIGN KEY ("product_item_id") REFERENCES "products"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_9148da8f26fc248e77a387e3112" FOREIGN KEY ("category_id") REFERENCES "category"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_9148da8f26fc248e77a387e3112"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_9c83b723f73b1984d0d4075cf26"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9148da8f26fc248e77a387e311"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c83b723f73b1984d0d4075cf2"`);
        await queryRunner.query(`DROP TABLE "product_categories"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
