const { Router } = require("express");

const productsRouter = Router();

productsRouter.get("/", getProductsHandler);

productsRouter.get("/:id", getProductByIdHandler);

productsRouter.delete("/:id", deleteProductHandler);

productsRouter.post("/", createProductHandler);

productsRouter.patch("/:id", updateProductHandler);

module.exports = productsRouter;
