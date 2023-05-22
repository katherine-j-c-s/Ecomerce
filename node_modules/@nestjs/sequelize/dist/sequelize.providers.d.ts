import { Provider } from '@nestjs/common';
import { SequelizeOptions } from 'sequelize-typescript';
export declare function createSequelizeProviders(entities?: Function[], connection?: SequelizeOptions | string): Provider[];
