import { MigrationInterface, QueryRunner } from 'typeorm';
import { runSeeders } from 'typeorm-extension';

export class Seeds1544303473346 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await runSeeders(queryRunner.connection, {
      seeds: ['database/seeds/seeder/*{.ts,.js}'],
    });
  }

  public async down(_: QueryRunner): Promise<any> {}
}
