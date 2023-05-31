const { Product } = require("../db");

const getProducts = async () => {
  let products = await Product.findAll();

  return products;
};

const getProductByID = async (id) => {
  let product = await Product.findOne({
    where: { id },
  });

  return product;
};

const createProduct = async (
  name,
  price,
  description,
  rating,
  image,
  stock
) => {
  if (!stock) {
    stock = 1; // Asignar valor predeterminado
  }

  let [product, created] = await Product.findOrCreate({
    where: { name },
    defaults: {
      name,
      price,
      description,
      rating,
      image,
      stock,
    },
  });

  if (!created) {
    await Product.increment("stock", { by: 1 });
  }

  return product;
};

const deleteProduct = async (id) => {
  let removedProduct = await Product.destroy({
    where: { id },
  });

  return removedProduct;
};

const updateProduct = async (id, datos) => {
  const product = await Product.findByPk(id);

  if (product) {
    const { name, price, description, rating, image, stock } = datos;
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.rating = rating || product.rating;
    product.stock = stock || product.stock;
    product.image = image || product.image;

    await product.save();
    return product;
  } else {
    throw new Error("Producto no encontrado");
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductByID,
  deleteProduct,
  updateProduct,
};
