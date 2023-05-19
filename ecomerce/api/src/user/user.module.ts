import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserController } from './user.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  exports: [SequelizeModule],
  controllers: [UserController],
})
export class UserModule {}
