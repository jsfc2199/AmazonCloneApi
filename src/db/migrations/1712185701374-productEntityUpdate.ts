import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductEntityUpdate1712185701374 implements MigrationInterface {
  name = 'ProductEntityUpdate1712185701374';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "UQ_594ca159cc17128d062999845f9"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "UQ_594ca159cc17128d062999845f9" UNIQUE ("in_stock")`,
    );
  }
}
