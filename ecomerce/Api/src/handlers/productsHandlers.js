const { createProduct, getProducts, getProductByID, deleteProduct, updateProduct, removeImage, addImage } = require("../controllers/productsController");

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
    let {name, price, description, image, stock, color, category, size} = req.body
    let createdProduct = await createProduct(name, price, description, image, stock, color, category, size)
    res.status(200).json(createdProduct);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
};

const deleteProductHandler = async (req, res) => {
  try {
    let { id } = req.params
    let product = await deleteProduct(id)
    res.status(200).json(product)
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
};

const updateProductHandler = async (req, res) => {
  try {
    let { id } = req.params
    let { name, price, description, image, stock, color, category, size} = req.body
    let product = await updateProduct(id, name, price, description, image, stock, color, category, size)
    res.status(200).json(product)
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
};

const removeImageHandler = async (req, res) => {
  try {
    let { id, image } = req.body
    let product = await removeImage(id, image)
    res.status(200).json(product)

  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

const addImageHandler = async (req, res) => {
  try {
    let { id, image } = req.body
    let product = await addImage(id, image)
    res.status(200).json(product)

  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

module.exports = {
  getProductByIdHandler,
  getProductsHandler,
  createProductHandler,
  deleteProductHandler,
  updateProductHandler,
  removeImageHandler,
  addImageHandler,
};
