import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    exports: [SequelizeModule]
})
export class UserModule {}
