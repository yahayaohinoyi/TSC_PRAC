import { MigrationInterface, QueryRunner } from 'typeorm';

export class sharedwith1627343202292 implements MigrationInterface {
  name = 'sharedwith1627343202292';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shared_note_entity" ADD "shared_with" integer`);
    await queryRunner.query(
      `ALTER TABLE "shared_note_entity" ADD CONSTRAINT "FK_a5c6d422a3dbbe7fb4e571908f9" FOREIGN KEY ("shared_with") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "note_entity" ADD CONSTRAINT "FK_fdf6e4c16bf729e3dc43b198778" FOREIGN KEY ("createdById") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "note_entity" DROP CONSTRAINT "FK_fdf6e4c16bf729e3dc43b198778"`);
    await queryRunner.query(`ALTER TABLE "shared_note_entity" DROP CONSTRAINT "FK_a5c6d422a3dbbe7fb4e571908f9"`);
    await queryRunner.query(`ALTER TABLE "shared_note_entity" DROP COLUMN "shared_with"`);
  }
}
