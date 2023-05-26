const { Router } = require("express");
const usersRouter = require("./users");
const productsRouter = require("./products");
const commentsRouter = require("./comments");

const mainRouter = Router();

mainRouter.use("/users", usersRouter);

mainRouter.use("/products", productsRouter);

mainRouter.use("/comments", commentsRouter);

module.exports = mainRouter;
