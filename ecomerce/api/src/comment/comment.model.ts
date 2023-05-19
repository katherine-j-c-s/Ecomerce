import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Comment extends Model<Comment> {
  @Column
  content: string;

  @Column
  rating: string;
}
