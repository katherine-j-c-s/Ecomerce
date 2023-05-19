import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  exports: [SequelizeModule],
})
export class ProductModule {}
