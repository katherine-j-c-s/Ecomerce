const {
  getUsers,
  getUsersByName,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const getUsersHandler = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const users = await getUsersByName(name);
      res.status(200).json(users);
    } else {
      const users = await getUsers();
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupHandler = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginHandler = async (req, res) => {
  try {
    res.status(200).json({ message: "Login exitoso" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutHandler = async (req, res) => {
  try {
    req.logout(); // Cierra la sesión actual del usuario
    res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await updateUser(id, req.body);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUserByIdHandler,
  getUsersHandler,
  signupHandler,
  loginHandler,
  logoutHandler,
  deleteUserHandler,
  updateUserHandler,
};
