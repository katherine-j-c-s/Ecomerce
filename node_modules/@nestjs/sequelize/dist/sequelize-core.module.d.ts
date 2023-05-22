import { DynamicModule, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { SequelizeModuleAsyncOptions, SequelizeModuleOptions } from './interfaces/sequelize-options.interface';
export declare class SequelizeCoreModule implements OnApplicationShutdown {
    private readonly options;
    private readonly moduleRef;
    constructor(options: SequelizeModuleOptions, moduleRef: ModuleRef);
    static forRoot(options?: SequelizeModuleOptions): DynamicModule;
    static forRootAsync(options: SequelizeModuleAsyncOptions): DynamicModule;
    onApplicationShutdown(): Promise<void>;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
    private static createConnectionFactory;
}
