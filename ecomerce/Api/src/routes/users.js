const { Router } = require("express");
const {
  getUsersHandler,
  getUserByIdHandler,
  signupHandler,
  loginHandler,
  deleteUserHandler,
  updateUserHandler,
} = require("../handlers/usersHandlers");

const passport = require("passport");

const usersRouter = Router();

usersRouter.get("/", getUsersHandler);

usersRouter.get("/:id", getUserByIdHandler);

usersRouter.post("/signup", signupHandler);

usersRouter.post("/login", passport.authenticate("local"), loginHandler);

usersRouter.delete("/:id", deleteUserHandler);

usersRouter.patch("/:id", updateUserHandler);

module.exports = usersRouter;
