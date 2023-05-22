"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSequelizeProviders = void 0;
const sequelize_utils_1 = require("./common/sequelize.utils");
function createSequelizeProviders(entities, connection) {
    const repositories = (entities || []).map(entity => ({
        provide: (0, sequelize_utils_1.getModelToken)(entity, connection),
        useFactory: (connection) => {
            if (!connection.repositoryMode) {
                return entity;
            }
            return connection.getRepository(entity);
        },
        inject: [(0, sequelize_utils_1.getConnectionToken)(connection)],
    }));
    return [...repositories];
}
exports.createSequelizeProviders = createSequelizeProviders;
