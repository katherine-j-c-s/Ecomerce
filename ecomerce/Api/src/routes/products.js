const { Router } = require("express");

const {
  getProductsHandler,
  getProductByIdHandler,
  createProductHandler,
  deleteProductHandler,
  updateProductHandler,
  removeImageHandler,
} = require("../handlers/productsHandlers");

const productsRouter = Router();

productsRouter.get("/", getProductsHandler);

productsRouter.get("/:id", getProductByIdHandler);

productsRouter.delete("/:id", deleteProductHandler);

productsRouter.post("/", createProductHandler);

productsRouter.patch("/:id", updateProductHandler);

productsRouter.delete("/remove_image/:image", removeImageHandler)

module.exports = productsRouter;
