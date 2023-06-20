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
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      image: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      featured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    },
    {
      timestamps: true,
    })
};
