import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserClientRelation1710203737714 implements MigrationInterface {
  name = 'UserClientRelation1710203737714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "credit_card" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "creditCardNumber" text NOT NULL, "creditCardPass" text NOT NULL, CONSTRAINT "PK_f033c4807b5062f5175dfe2f92a" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_cards" ("user_id" uuid NOT NULL, "credit_card_id" uuid NOT NULL, CONSTRAINT "PK_359bbf9d31185a8376e51d9fd45" PRIMARY KEY ("user_id", "credit_card_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ff014d8d02b6e24048708e3299" ON "users_cards" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b49ded3da124b92da5f5620fe7" ON "users_cards" ("credit_card_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users_cards" ADD CONSTRAINT "FK_ff014d8d02b6e24048708e32991" FOREIGN KEY ("user_id") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_cards" ADD CONSTRAINT "FK_b49ded3da124b92da5f5620fe7f" FOREIGN KEY ("credit_card_id") REFERENCES "credit_card"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_cards" DROP CONSTRAINT "FK_b49ded3da124b92da5f5620fe7f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_cards" DROP CONSTRAINT "FK_ff014d8d02b6e24048708e32991"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b49ded3da124b92da5f5620fe7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ff014d8d02b6e24048708e3299"`,
    );
    await queryRunner.query(`DROP TABLE "users_cards"`);
    await queryRunner.query(`DROP TABLE "credit_card"`);
  }
}
