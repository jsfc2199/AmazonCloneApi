import { MigrationInterface, QueryRunner } from 'typeorm';

export class CardUnique1710209010774 implements MigrationInterface {
  name = 'CardUnique1710209010774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "credit_card" ADD CONSTRAINT "UQ_c4793bc513a643eae0b02d1bf47" UNIQUE ("creditCardNumber")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "credit_card" DROP CONSTRAINT "UQ_c4793bc513a643eae0b02d1bf47"`,
    );
  }
}
