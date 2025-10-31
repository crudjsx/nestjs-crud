import { join } from 'path';

export enum DatabaseType {
  POSTGRES = 'postgres',
  MYSQL = 'mysql',
  SQLITE = 'sqlite',
}

export const createDbConfig = (type: DatabaseType) => ({
  type,
  host: '127.0.0.1',
  // ===only for mysql and postgres===start
  port: type === 'postgres' ? 5432 : 3306,
  username: type === 'postgres' ? 'root' : 'nestjsx_crud',
  password: type === 'postgres' ? 'root' : 'nestjsx_crud',
  // ===only for mysql and postgres===end
  database:
    type === 'sqlite' ? join(process.cwd(), 'nestjsx_crud.sqlite') : 'nestjsx_crud',
  synchronize: false,
  logging: true,
  entities: [join(process.cwd(), 'integration', './**/*.entity{.ts,.js}')],
  migrationsTableName: 'migrations',
  migrations: [`${join(__dirname, 'migrations')}/*`],
});
