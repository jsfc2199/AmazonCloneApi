import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustedAddressesUserRelation1710813529500
  implements MigrationInterface
{
  name = 'AdjustedAddressesUserRelation1710813529500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" text NOT NULL, "city" text NOT NULL, "streetAddress" text NOT NULL, CONSTRAINT "UQ_8c67f72e8a7209d46281c975542" UNIQUE ("streetAddress"), CONSTRAINT "PK_496d4a29b0dfa82ede19a4bcad0" PRIMARY KEY ("uuid"))`,
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
      `ALTER TABLE "users_addresses" ADD CONSTRAINT "FK_a6de63ed9c7d202b9cadae024df" FOREIGN KEY ("user_id") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_addresses" ADD CONSTRAINT "FK_74de4f43d79bc7d7cb5c20d7705" FOREIGN KEY ("address_id") REFERENCES "address"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_addresses" DROP CONSTRAINT "FK_74de4f43d79bc7d7cb5c20d7705"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_addresses" DROP CONSTRAINT "FK_a6de63ed9c7d202b9cadae024df"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_74de4f43d79bc7d7cb5c20d770"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a6de63ed9c7d202b9cadae024d"`,
    );
    await queryRunner.query(`DROP TABLE "users_addresses"`);
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
