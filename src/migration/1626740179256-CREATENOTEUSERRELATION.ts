import { MigrationInterface, QueryRunner } from 'typeorm';

export class CREATENOTEUSERRELATION1626740179256 implements MigrationInterface {
  name = 'CREATENOTEUSERRELATION1626740179256';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "note_entity" ("id" SERIAL NOT NULL, "note" character varying NOT NULL, "noteLink" character varying NOT NULL, "isSharable" boolean NOT NULL DEFAULT false, "isResharable" boolean NOT NULL DEFAULT false, "isEditable" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" integer, CONSTRAINT "PK_664c6fdaf79389734ae737f7d27" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "note_entity" ADD CONSTRAINT "FK_fdf6e4c16bf729e3dc43b198778" FOREIGN KEY ("createdById") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "note_entity" DROP CONSTRAINT "FK_fdf6e4c16bf729e3dc43b198778"`);
    await queryRunner.query(`DROP TABLE "note_entity"`);
    await queryRunner.query(`DROP TABLE "user_entity"`);
  }
}
