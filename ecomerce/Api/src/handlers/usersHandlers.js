const getUsersHandler = (req, res) => {
  res.send("Estoy llevando todos los users");
};

const getUsersByIdHandler = (req, res) => {
  res.send("Estoy llevando un usuario por id");
};

const postUserHandler = (req, res) => {
  res.send("Estoy creando un usuario=");
};

const deleteUserHandler = (req, res) => {
  res.send("Estoy eliminando un usuario=");
};

const updateUserHandler = (req, res) => {
  res.send("Estoy actualizando un usuario=");
};

module.exports = {
  getUsersByIdHandler,
  getUsersHandler,
  postUserHandler,
  deleteUserHandler,
  updateUserHandler,
};
