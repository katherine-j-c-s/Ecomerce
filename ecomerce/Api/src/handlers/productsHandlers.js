const getProductsHandler = (req, res) => {
  res.send("Estoy llevando todos los productos");
};

const getProductByIdHandler = (req, res) => {
  res.send("Estoy llevando un producto por id");
};

const postProductHandler = (req, res) => {
  res.send("Estoy creando un producto ");
};

const deleteProductHandler = (req, res) => {
  res.send("Estoy eliminando un producto ");
};

const updateProductHandler = (req, res) => {
  res.send("Estoy actualizando un producto ");
};

module.exports = {
  getProductByIdHandler,
  getProductsHandler,
  postProductHandler,
  deleteProductHandler,
  updateProductHandler,
};
