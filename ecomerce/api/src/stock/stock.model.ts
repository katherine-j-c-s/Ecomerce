import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Stock extends Model<Stock> {
  @Column
  quantity: string;

  @Column
  color: string;

  @Column
  size: string;
}
