import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsersTable1729939204539 implements MigrationInterface {
    name = 'UpdateUsersTable1729939204539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "gender" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "gender"`);
    }

}
