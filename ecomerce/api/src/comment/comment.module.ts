import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comment.model';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  exports: [SequelizeModule],
})
export class CommentModule {}
