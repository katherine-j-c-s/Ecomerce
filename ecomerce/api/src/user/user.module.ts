import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  exports: [SequelizeModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
