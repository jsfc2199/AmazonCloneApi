import { MigrationInterface, QueryRunner } from 'typeorm';

export class Category1712618935136 implements MigrationInterface {
  name = 'Category1712618935136';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "category" text NOT NULL, CONSTRAINT "UQ_dab3b9cd30b5940f3a808316991" UNIQUE ("category"), CONSTRAINT "PK_86ee096735ccbfa3fd319af1833" PRIMARY KEY ("uuid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
