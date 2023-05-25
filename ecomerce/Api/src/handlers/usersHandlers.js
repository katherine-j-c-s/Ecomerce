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

const getUsersByIdHandler = (req, res) => {
  const { id } = req.params;

  try {
    const user = getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postUserHandler = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUserHandler = (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = deleteUser(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserHandler = (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = updateUser(id, req.body);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsersByIdHandler,
  getUsersHandler,
  postUserHandler,
  deleteUserHandler,
  updateUserHandler,
};
