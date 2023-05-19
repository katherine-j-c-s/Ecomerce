export interface IDatabaseConfigAttributes {
  dialect: string;
  port: number | string;
  username: string;
  password: string;
  database: string;
  host: string;
}

export interface IDatabaseConfig {
  port: number | string;
  development: IDatabaseConfigAttributes;
}
