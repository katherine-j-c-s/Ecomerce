const { Router } = require("express");

const mainRouter = Router();

mainRouter.use("/users", usersRoutes);

mainRouter.use("/products", productsRouter);

mainRouter.use("/comments", commentsRoutes);

module.exports = mainRouter;
