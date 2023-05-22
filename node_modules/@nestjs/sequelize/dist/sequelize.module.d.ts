import { DynamicModule } from '@nestjs/common';
import { SequelizeOptions } from 'sequelize-typescript';
import { SequelizeModuleAsyncOptions, SequelizeModuleOptions } from './interfaces/sequelize-options.interface';
export declare class SequelizeModule {
    static forRoot(options: SequelizeModuleOptions): DynamicModule;
    static forFeature(entities?: Function[], connection?: SequelizeOptions | string): DynamicModule;
    static forRootAsync(options: SequelizeModuleAsyncOptions): DynamicModule;
}
