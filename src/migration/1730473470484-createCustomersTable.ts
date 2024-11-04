import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomersTable1730473470484 implements MigrationInterface {
    name = 'CreateCustomersTable1730473470484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_users_name"`);
        await queryRunner.query(`CREATE TABLE "Customers" ("id" SERIAL NOT NULL, "name" character varying, "email" character varying, "password" character varying, "age" integer, "gender" character varying, "city" character varying, CONSTRAINT "PK_c3220bb99cfda194990bc2975be" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Customers"`);
        await queryRunner.query(`CREATE INDEX "idx_users_name" ON "Users" ("name") `);
    }

}
