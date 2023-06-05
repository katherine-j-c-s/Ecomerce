const { Router } = require("express");
const {
  getUsersHandler,
  getUserByIdHandler,
  signupHandler,
  loginHandler,
  logoutHandler,
  deleteUserHandler,
  updateUserHandler,
} = require("../handlers/usersHandlers");

const { ensureAuthenticated } = require("./authMiddleware");

const passport = require("passport");

const usersRouter = Router();

usersRouter.post("/signup", signupHandler);

usersRouter.post("/login", passport.authenticate("local"), loginHandler);

usersRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

usersRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Redirige al usuario a la página de inicio o a otra página deseada después de la autenticación exitosa
    res.redirect("http://localhost:3001");
  }
);

usersRouter.use(ensureAuthenticated);

usersRouter.post("/logout", logoutHandler);

usersRouter.get("/", getUsersHandler);

usersRouter.get("/:id", getUserByIdHandler);

usersRouter.delete("/:id", deleteUserHandler);

usersRouter.patch("/:id", updateUserHandler);

module.exports = usersRouter;
