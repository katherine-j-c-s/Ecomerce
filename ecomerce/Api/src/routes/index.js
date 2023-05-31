const { Router } = require("express");
const usersRouter = require("./users");
const productsRouter = require("./products");
const commentsRouter = require("./comments");
const paymentRouter = require("./payment");

const mainRouter = Router();

mainRouter.use("/users", usersRouter);

mainRouter.use("/products", productsRouter);

mainRouter.use("/comments", commentsRouter);

mainRouter.use("/payment", paymentRouter);

module.exports = mainRouter;
