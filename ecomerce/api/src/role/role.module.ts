import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './role.model';

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  exports: [SequelizeModule],
})
export class RoleModule {}
