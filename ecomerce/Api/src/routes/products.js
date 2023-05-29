const { Router } = require("express");

const {
  getProductsHandler,
  getProductByIdHandler,
  createProductHandler,
  deleteProductHandler,
  updateProductHandler,
} = require("../handlers/productsHandlers");

const productsRouter = Router();

productsRouter.get("/", getProductsHandler);

productsRouter.get("/:id", getProductByIdHandler);

productsRouter.delete("/:id", deleteProductHandler);

productsRouter.post("/", createProductHandler);

productsRouter.patch("/:id", updateProductHandler);

module.exports = productsRouter;
