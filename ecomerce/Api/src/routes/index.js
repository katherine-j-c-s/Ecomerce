const { Router } = require("express");
const usersRouter = require("./users");
const productsRouter = require("./products");
const commentsRouter = require("./comments");
const colorsRouter = require("./colors");
const sizesRouter = require("./sizes");
const categoriesRouter = require("./categories");

const mainRouter = Router();

mainRouter.use("/users", usersRouter);

mainRouter.use("/products", productsRouter);

mainRouter.use("/comments", commentsRouter);

mainRouter.use("/colors", colorsRouter);

mainRouter.use("/sizes", sizesRouter);

mainRouter.use("/categories", categoriesRouter);

module.exports = mainRouter;
