import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEntity1709253484218 implements MigrationInterface {
  name = 'UserEntity1709253484218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "identification" text NOT NULL, "name" text NOT NULL, "lastName" text, "email" text NOT NULL, "phone" text, "password" character varying NOT NULL, "address" text, "creditCardNumber" text, "creditCardPass" text, CONSTRAINT "UQ_140d91acc242af813ce91987621" UNIQUE ("identification"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_ab68a79228d23afd3d3f47e84bc" UNIQUE ("creditCardNumber"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
