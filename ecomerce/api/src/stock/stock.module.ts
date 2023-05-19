import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stock } from './stock.model';

@Module({
    imports: [SequelizeModule.forFeature([Stock])],
    exports: [SequelizeModule]
})
export class StockModule {}
