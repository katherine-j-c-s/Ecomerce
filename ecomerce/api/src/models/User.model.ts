/* eslint-disable prettier/prettier */
import { Column, Model, Table } from 'sequelize-typescript';
@Table
export class User extends Model {
  @Column
  Name: string;

  @Column
  LastName: string;

  @Column
  Email: string;

  @Column
  Password: string;

  @Column
  Address: string;

  @Column
  ImgUrl: string;
}
