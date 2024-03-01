import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [__dirname + `/src/**/*.entity.[tj]s`],
  migrations: [__dirname + `/src/db/migrations/**/*.[tj]s`],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
