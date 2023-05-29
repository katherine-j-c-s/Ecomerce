const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("client", "admin"),
        allowNull: false,
        defaultValue: "client",
      },
    },
    {
      timestamps: false,
    }
  );

  User.encryptPassword = function (password) {
    // Se genera un salt para la contrasenia
    var salt = bcrypt.genSaltSync(10);
    // Se hashea la contrasenia con el salt generado arriba
    return bcrypt.hashSync(password, salt);
  };
  User.comparePassword = function (password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  };
};
