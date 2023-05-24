const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isNumeric: true,
          isDecimal: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      image: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
};
