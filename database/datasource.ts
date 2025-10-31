import { DataSource } from 'typeorm';
import { createDbConfig, DatabaseType } from './config';

export const type =
  (process.env.TYPEORM_CONNECTION as 'postgres' | 'mysql' | 'sqlite') ?? 'mysql';
export const isPg = type === 'postgres';
const isMysql = type === 'mysql';
export const dbConfig = createDbConfig(
  isPg ? DatabaseType.POSTGRES : isMysql ? DatabaseType.MYSQL : DatabaseType.SQLITE,
);
export default new DataSource(dbConfig);
