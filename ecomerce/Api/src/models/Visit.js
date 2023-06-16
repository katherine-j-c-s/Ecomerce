const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Visit",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        alloNull: false,
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
};