import { MigrationInterface, QueryRunner } from "typeorm";

export class IntialMigration1701058033985 implements MigrationInterface {
    name = 'IntialMigration1701058033985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "boardSize" integer NOT NULL DEFAULT '3', "currentPlayer" character varying NOT NULL, "winner" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "ended_at" TIMESTAMP, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "move" ("moveId" uuid NOT NULL DEFAULT uuid_generate_v4(), "gameId" uuid NOT NULL, "userId" uuid NOT NULL, "symbol" character varying NOT NULL, "row" integer NOT NULL, "column" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9cf37e1209d3e3c05dc55dccbc4" PRIMARY KEY ("moveId"))`);
        await queryRunner.query(`CREATE TABLE "player" ("gameId" uuid NOT NULL, "userId" uuid NOT NULL, "symbol" character varying NOT NULL, "computer" boolean NOT NULL DEFAULT false, "joined_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1226352721f49996c9bf0bbe9d2" PRIMARY KEY ("gameId", "userId"))`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "symbol"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "computer"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "joined_at"`);
        await queryRunner.query(`ALTER TABLE "player" ADD "symbol" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "player" ADD "computer" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "player" ADD "joined_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`CREATE INDEX "IDX_7dfdd31fcd2b5aa3b08ed15fe8" ON "player" ("gameId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7687919bf054bf262c669d3ae2" ON "player" ("userId") `);
        await queryRunner.query(`ALTER TABLE "move" ADD CONSTRAINT "FK_e7d286bcab2828876ab2eef3515" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move" ADD CONSTRAINT "FK_ed05ae5ce30c95fbe635d6785aa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_7dfdd31fcd2b5aa3b08ed15fe8a" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_7687919bf054bf262c669d3ae21" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_7687919bf054bf262c669d3ae21"`);
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_7dfdd31fcd2b5aa3b08ed15fe8a"`);
        await queryRunner.query(`ALTER TABLE "move" DROP CONSTRAINT "FK_ed05ae5ce30c95fbe635d6785aa"`);
        await queryRunner.query(`ALTER TABLE "move" DROP CONSTRAINT "FK_e7d286bcab2828876ab2eef3515"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7687919bf054bf262c669d3ae2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7dfdd31fcd2b5aa3b08ed15fe8"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "joined_at"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "computer"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "symbol"`);
        await queryRunner.query(`ALTER TABLE "player" ADD "joined_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "player" ADD "computer" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "player" ADD "symbol" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "player"`);
        await queryRunner.query(`DROP TABLE "move"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
