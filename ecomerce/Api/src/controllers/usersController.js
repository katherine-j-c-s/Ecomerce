const { User, UserOrder, Comment } = require("../db");
const { Op } = require("sequelize");
require("dotenv").config();
const bcrypt = require("bcrypt");
const cloudinary = require("../cloudinary");
const Sequelize = require("sequelize");

const getUsers = async () => {
  const users = await User.findAll({
    include: [{ model: UserOrder }, { model: Comment }],
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
    include: [{ model: Comment }],
  });

  await UserOrder.findAll({
    where: {
      email: { [Op.iLike]: users.map((user) => user.mail) },
    },
  });

  if (users.length === 0) {
    throw new Error("No se encontraron usuarios con ese nombre.");
  }

  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    include: [
      {
        model: UserOrder,
        where: {
          email: Sequelize.literal(
            `(SELECT email FROM "Users" WHERE "Users"."id" = "UserOrder"."UserId")`
          ),
          status: "fullfilled",
        },
      },
      { model: Comment },
    ],
  });

  if (user) {
    return user;
  } else {
    throw new Error("Usuario no encontrado");
  }
};

const createUser = async ({
  googleId,
  mail,
  password,
  first_name,
  last_name,
  address,
  image,
  role,
}) => {
  let hashedPassword = null;
  if (password) {
    hashedPassword = bcrypt.hashSync(password, 10); // Encripta la contraseña
  }

  const response = await cloudinary.uploader.upload(image); // Espera la carga de la imagen

  const imageObject = {
    public_id: response.public_id,
    url: response.url,
  };

  const newUser = await User.create({
    googleId: googleId && googleId,
    mail,
    password: hashedPassword, // Almacena la contraseña encriptada
    first_name,
    last_name,
    address,
    image: imageObject,
    role,
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
      status,
    } = datos;

    let imageObject = null;
    if (image) {
      await cloudinary.uploader.destroy(user.image.public_id);
      const response = await cloudinary.uploader.upload(image);
      imageObject = {
        public_id: response.public_id,
        url: response.url,
      };
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = bcrypt.hashSync(password, 10); // Encripta la contraseña
    }

    user.mail = mail || user.mail;
    user.password = hashedPassword || user.password;
    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.address = address || user.address;
    user.image = imageObject || user.image;
    user.role = role || user.role;
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
    await cloudinary.uploader.destroy(user.image.public_id);
    await user.destroy();
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
