const { User, Order, Comment } = require("../db");
const { Op } = require("sequelize");

const getUsers = async () => {
  const users = await User.findAll({
    include: [{ model: Order }, { model: Comment }],
  });

  if (users.length === 0) {
    throw new Error("No se encontraron usuarios.");
  }

  return users;
};

const getUsersByName = async (name) => {
  const users = await User.findAll({
    where: {
      first_name: { [Op.iLike]: `%${name}%` },
    },
    include: [{ model: Order }, { model: Comment }],
  });

  if (users.length === 0) {
    throw new Error("No se encontraron usuarios con ese nombre.");
  }

  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    include: [{ model: Order }, { model: Comment }],
  });

  if (user) {
    return user;
  } else {
    throw new Error("Usuario no encontrado");
  }
};

const createUser = async ({
  mail,
  password,
  first_name,
  last_name,
  address,
  image,
  role,
  purchases,
}) => {
  const newUser = await User.create({
    mail,
    password,
    first_name,
    last_name,
    address,
    image,
    role,
    purchases,
  });
  return newUser;
};

const updateUser = async (id, datos) => {
  const user = await User.findByPk(id);

  if (user) {
    const {
      mail,
      password,
      first_name,
      last_name,
      address,
      image,
      role,
      purchases,
      status,
    } = datos;

    user.mail = mail || user.mail;
    user.password = password || user.password;
    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.address = address || user.address;
    user.image = image || user.image;
    user.role = role || user.role;
    user.purchases = purchases || user.purchases;
    user.status = status || user.status;

    await user.save();
    return user;
  } else {
    throw new Error("Usuario no encontrado");
  }
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);

  if (user) {
    user.status = "inactive";
    await user.save();
    return "Usuario eliminado con éxito";
  } else {
    throw new Error("Usuario no encontrado");
  }
};

module.exports = {
  getUsers,
  getUsersByName,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
