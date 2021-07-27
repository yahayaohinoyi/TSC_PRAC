import { MigrationInterface, QueryRunner } from 'typeorm';

export class SHAREDNOTESENTITY1627336729939 implements MigrationInterface {
  name = 'SHAREDNOTESENTITY1627336729939';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "shared_note_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "note_id" integer, CONSTRAINT "PK_d12976d27f2f230c096db26cff7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "note_entity" ADD "createdById" integer`);
    await queryRunner.query(
      `ALTER TABLE "shared_note_entity" ADD CONSTRAINT "FK_da6ae4658dc72b0ca0b3ac23648" FOREIGN KEY ("user_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shared_note_entity" ADD CONSTRAINT "FK_dca26d5ca3e80418bfc0520beda" FOREIGN KEY ("note_id") REFERENCES "note_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shared_note_entity" DROP CONSTRAINT "FK_dca26d5ca3e80418bfc0520beda"`);
    await queryRunner.query(`ALTER TABLE "shared_note_entity" DROP CONSTRAINT "FK_da6ae4658dc72b0ca0b3ac23648"`);
    await queryRunner.query(`DROP TABLE "shared_note_entity"`);
  }
}
