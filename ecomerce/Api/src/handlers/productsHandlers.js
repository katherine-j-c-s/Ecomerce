const { createProduct, getProducts, getProductByID, deleteProduct, updateProduct } = require("../controllers/productsController");

const getProductsHandler = async (req, res) => {
  try {
    let getAllProducts = await getProducts()
    res.status(200).json(getAllProducts);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
};

const getProductByIdHandler = async (req, res) => {
  try {
    let { id } = req.params
    let product = await getProductByID(id)
    res.status(200).json(product)
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
};

const createProductHandler = async (req, res) => {
  try {
    let {name, price, description, rating, image, stock} = req.body
    let createdProduct = await createProduct(name, price, description, rating, image, stock)
    res.status(200).json(createdProduct);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
};

const deleteProductHandler = async (req, res) => {
  try {
    let { id } = req.params
    let product = await deleteProduct(id)
    res.stauts(200).json(product)
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
};

const updateProductHandler = async (req, res) => {
  try {
    let {name, price, description, rating, image} = req.body
    let product = await updateProduct(name, price, description, rating, image)
    res.status(200).json(product)
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
};

module.exports = {
  getProductByIdHandler,
  getProductsHandler,
  createProductHandler,
  deleteProductHandler,
  updateProductHandler,
};
