import { DataSource } from 'typeorm';
import { createDbConfig, DatabaseType } from './config';

export const sqliteConfig = createDbConfig(DatabaseType.SQLITE);
export const sqliteDataSource = new DataSource(sqliteConfig);
