const { Router } = require("express");
const usersRouter = require("./users");
const productsRouter = require("./products");
const commentsRouter = require("./comments");
const colorsRouter = require("./colors");
const sizesRouter = require("./sizes");
const categoriesRouter = require("./categories");
const paymentRouter = require("./payment");
const visitsRouter = require("./visits");

const mainRouter = Router();

mainRouter.use("/users", usersRouter);

mainRouter.use("/products", productsRouter);

mainRouter.use("/comments", commentsRouter);

mainRouter.use("/colors", colorsRouter);

mainRouter.use("/sizes", sizesRouter);

mainRouter.use("/categories", categoriesRouter);

mainRouter.use("/payment", paymentRouter);

mainRouter.use("/visits", visitsRouter)

module.exports = mainRouter;
