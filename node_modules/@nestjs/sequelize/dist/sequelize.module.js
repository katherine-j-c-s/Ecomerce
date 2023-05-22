"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SequelizeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeModule = void 0;
const common_1 = require("@nestjs/common");
const entities_metadata_storage_1 = require("./entities-metadata.storage");
const sequelize_core_module_1 = require("./sequelize-core.module");
const sequelize_constants_1 = require("./sequelize.constants");
const sequelize_providers_1 = require("./sequelize.providers");
let SequelizeModule = SequelizeModule_1 = class SequelizeModule {
    static forRoot(options) {
        return {
            module: SequelizeModule_1,
            imports: [sequelize_core_module_1.SequelizeCoreModule.forRoot(options)],
        };
    }
    static forFeature(entities = [], connection = sequelize_constants_1.DEFAULT_CONNECTION_NAME) {
        const providers = (0, sequelize_providers_1.createSequelizeProviders)(entities, connection);
        entities_metadata_storage_1.EntitiesMetadataStorage.addEntitiesByConnection(connection, entities);
        return {
            module: SequelizeModule_1,
            providers: providers,
            exports: providers,
        };
    }
    static forRootAsync(options) {
        return {
            module: SequelizeModule_1,
            imports: [sequelize_core_module_1.SequelizeCoreModule.forRootAsync(options)],
        };
    }
};
SequelizeModule = SequelizeModule_1 = __decorate([
    (0, common_1.Module)({})
], SequelizeModule);
exports.SequelizeModule = SequelizeModule;
