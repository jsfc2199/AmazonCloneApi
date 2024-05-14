import { MigrationInterface, QueryRunner } from 'typeorm';

export class SpecificationHihlights1715705784176 implements MigrationInterface {
  name = 'SpecificationHihlights1715705784176';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "specification_highlight" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "feature" text NOT NULL, "featureDescription" text, "featureDisplayName" text NOT NULL, "assembledSpecs" text NOT NULL, "assembledDescription" text, "assembledDisplayName" text NOT NULL, CONSTRAINT "PK_4e4010e6b8d277815c53b031b9d" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "specificationHighlightsUuid" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "UQ_154cbfd0eeb929fd7b9d0a33da7" UNIQUE ("specificationHighlightsUuid")`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_154cbfd0eeb929fd7b9d0a33da7" FOREIGN KEY ("specificationHighlightsUuid") REFERENCES "specification_highlight"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_154cbfd0eeb929fd7b9d0a33da7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "UQ_154cbfd0eeb929fd7b9d0a33da7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "specificationHighlightsUuid"`,
    );
    await queryRunner.query(`DROP TABLE "specification_highlight"`);
  }
}
