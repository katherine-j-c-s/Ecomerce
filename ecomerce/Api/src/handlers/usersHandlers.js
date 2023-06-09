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
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutHandler = async (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        throw new Error("Error al cerrar la sesión");
      }
      res.status(200).json({ message: "Sesión cerrada exitosamente" });
    });
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

const googleHandler = async (req, res) => {
  try {
    let user;

    if (req.user) {
      // El usuario ya existe en la base de datos y se autenticó correctamente
      user = req.user;
    } else if (req.newUser) {
      // Se creó un nuevo usuario durante la autenticación
      user = req.newUser;
    } else {
      // En caso de que no se establezca el usuario o el nuevo usuario, ocurrió un error
      throw new Error("Error during authentication");
    }

    res.redirect(`http://localhost:5173/?userId=${user.id}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  googleHandler,
};
