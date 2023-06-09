const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Size",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        alloNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
