import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {
  @Column
  name: string;

  @Column
  type: string;

  @Column
  genre: string;

  @Column
  image: string;

  @Column
  clicked: string;
}
