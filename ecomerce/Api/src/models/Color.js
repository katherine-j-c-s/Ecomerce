const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Color",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        alloNull: false,
      },
      color: {
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
