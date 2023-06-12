const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      email: {
        type: DataTypes.STRING,
      },
      dni: { type: DataTypes.INTEGER },
      city: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      postal: {
        type: DataTypes.STRING,
      },
      total: {
        type: DataTypes.DECIMAL,
        validate: {
          isNumeric: true,
          isDecimal: true,
        },
      },
      paymentMethod: {
        type: DataTypes.STRING,
      },
      products: { type: DataTypes.ARRAY(DataTypes.JSONB) },
      status: {
        type: DataTypes.ENUM([
          "cart",
          "created",
          "in_process",
          "fullfilled",
          "rejected",
        ]),
        defaultValue: "cart",
        allowNull: false,
      },
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
