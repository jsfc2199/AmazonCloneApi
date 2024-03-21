import { MigrationInterface, QueryRunner } from 'typeorm';

export class StreetAddressNotUnique1710904587726 implements MigrationInterface {
  name = 'StreetAddressNotUnique1710904587726';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "UQ_8c67f72e8a7209d46281c975542"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "UQ_8c67f72e8a7209d46281c975542" UNIQUE ("streetAddress")`,
    );
  }
}
