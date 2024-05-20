import { MigrationInterface, QueryRunner } from "typeorm";

export class Rating1716165219024 implements MigrationInterface {
    name = 'Rating1716165219024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rating" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" double precision, "count" integer, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text, "text" text, "rating" double precision, "review_submission_time" text, "user_nickname" text, "productRatingId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_c5d4ef699fcce496c918ea9f682" FOREIGN KEY ("productRatingId") REFERENCES "rating"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_c5d4ef699fcce496c918ea9f682"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "rating"`);
    }

}
