import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserData1709684803432 implements MigrationInterface {
  name = 'UserData1709684803432';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "identification" text NOT NULL, "name" text NOT NULL, "lastName" text, "email" text NOT NULL, "password" character varying NOT NULL, "phone" text, "cellphone" text, CONSTRAINT "UQ_140d91acc242af813ce91987621" UNIQUE ("identification"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
