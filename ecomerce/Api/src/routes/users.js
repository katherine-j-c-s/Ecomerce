const { Router } = require("express");
const {
  getUsersHandler,
  getUserByIdHandler,
  postUserHandler,
  deleteUserHandler,
  updateUserHandler,
} = require("../handlers/usersHandlers");

const usersRouter = Router();

usersRouter.get("/", getUsersHandler);

usersRouter.get("/:id", getUserByIdHandler);

usersRouter.post("/", postUserHandler);

usersRouter.delete("/:id", deleteUserHandler);

usersRouter.patch("/:id", updateUserHandler);

module.exports = usersRouter;
