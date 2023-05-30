const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
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
    },
    {
      timestamps: false,
    }
  );
};
