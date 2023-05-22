"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateString = exports.getConnectionName = exports.handleRetry = exports.getConnectionPrefix = exports.getConnectionToken = exports.getModelToken = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const sequelize_typescript_1 = require("sequelize-typescript");
const uuid_1 = require("uuid");
const circular_dependency_exception_1 = require("../exceptions/circular-dependency.exception");
const sequelize_constants_1 = require("../sequelize.constants");
const logger = new common_1.Logger('SequelizeModule');
function getModelToken(entity, connection = sequelize_constants_1.DEFAULT_CONNECTION_NAME) {
    if ((entity === null) || (entity === undefined)) {
        throw new circular_dependency_exception_1.CircularDependencyException('@InjectModel()');
    }
    const connectionPrefix = getConnectionPrefix(connection);
    return `${connectionPrefix}${entity.name}Repository`;
}
exports.getModelToken = getModelToken;
function getConnectionToken(connection = sequelize_constants_1.DEFAULT_CONNECTION_NAME) {
    return sequelize_constants_1.DEFAULT_CONNECTION_NAME === connection
        ? sequelize_typescript_1.Sequelize
        : 'string' === typeof connection
            ? `${connection}Connection`
            : sequelize_constants_1.DEFAULT_CONNECTION_NAME === connection.name || !connection.name
                ? sequelize_typescript_1.Sequelize
                : `${connection.name}Connection`;
}
exports.getConnectionToken = getConnectionToken;
function getConnectionPrefix(connection = sequelize_constants_1.DEFAULT_CONNECTION_NAME) {
    if (connection === sequelize_constants_1.DEFAULT_CONNECTION_NAME) {
        return '';
    }
    if (typeof connection === 'string') {
        return connection + '_';
    }
    if (connection.name === sequelize_constants_1.DEFAULT_CONNECTION_NAME || !connection.name) {
        return '';
    }
    return connection.name + '_';
}
exports.getConnectionPrefix = getConnectionPrefix;
function handleRetry(retryAttempts = 9, retryDelay = 3000) {
    return (source) => source.pipe((0, operators_1.retryWhen)(e => e.pipe((0, operators_1.scan)((errorCount, error) => {
        logger.error(`Unable to connect to the database. Retrying (${errorCount +
            1})...`, error.stack);
        if (errorCount + 1 >= retryAttempts) {
            throw error;
        }
        return errorCount + 1;
    }, 0), (0, operators_1.delay)(retryDelay))));
}
exports.handleRetry = handleRetry;
function getConnectionName(options) {
    return options && options.name ? options.name : sequelize_constants_1.DEFAULT_CONNECTION_NAME;
}
exports.getConnectionName = getConnectionName;
const generateString = () => (0, uuid_1.v4)();
exports.generateString = generateString;
