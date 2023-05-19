/* eslint-disable prettier/prettier */
import { Column, Model, Table } from 'sequelize-typescript';
@Table
export class Roles extends Model {
  @Column
  RoleType: string;
}
