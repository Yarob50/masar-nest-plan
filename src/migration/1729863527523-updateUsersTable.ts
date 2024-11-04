import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsersTable1729863527523 implements MigrationInterface {
    name = 'UpdateUsersTable1729863527523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "age" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "name"`);
    }

}
