const { Router } = require("express");
const productsRouter = Router();
const {
  getProductsHandler,
  getProductByIdHandler,
  createProductHandler,
  deleteProductHandler,
  updateProductHandler,
  removeImageHandler,
  addImageHandler,
} = require("../handlers/productsHandlers");

productsRouter.get("/get_products", getProductsHandler);

productsRouter.get("/get_product/:id", getProductByIdHandler);

productsRouter.delete("/remove_product/:id", deleteProductHandler);

productsRouter.post("/create_product", createProductHandler);

productsRouter.delete("/remove_image", removeImageHandler);

productsRouter.post("/add_image", addImageHandler);

productsRouter.patch("/update_product/:id", updateProductHandler);

module.exports = productsRouter;
