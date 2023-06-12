const { Product, Color, Category, Size } = require("../db");
const { hard } = require("./mockedData/mockedProducts");
const cloudinary = require("../cloudinary")
const sendEmail = require("../nodemailer")
require("dotenv").config();


const convertAllProducts = (res) => {
  let { id, name, price, image, Color, Size, Category } = res;
  return (newObj = {
    id,
    name,
    price,
    color: Color?.dataValues.color || null,
    size: Size?.dataValues.size || null,
    category: Category?.dataValues.name || null,
    image,
  });
};

const convertSingleProduct = (res) => {
  let {
    id,
    name,
    price,
    image,
    description,
    stock,
    available,
    Comments,
    Category,
    Color,
    Size,
  } = res;

  return (newObj = {
    id,
    name,
    price,
    description,
    stock,
    available,
    color: Color?.dataValues.color || null,
    size: Size?.dataValues.size || null,
    category: Category?.dataValues.name || null,
    comments: Comments,
    image,
  });
};




const getProducts = async () => {
  let allProducts = [];
  await Product.findAll({ include: { all: true } }).then(async (responses) => {
    await responses.map((res) =>
      allProducts.push(convertAllProducts(res.dataValues))
    );
  });

  const count = await Product.count();
  if (count === 0) {
    await Product.bulkCreate(hard);
    return allProducts;
  } else {
    return allProducts;
  }
};

const getProductByID = async (id) => {
  let product = await Product.findOne({
    where: { id },
    include: { all: true },
  });
  if (product === null) throw new Error("No se encuentra el producto");

  return convertSingleProduct(product);
};

const createProduct = async (name, price, description, image, stock, color, category, size) => {
  let available;
  if (stock === 0 || stock === null) available = false;

  let ColorId 
  let CategoryId
  let SizeId
  if(color) {
      let { id } = await Color.findOne({
        where: { color }
      })
      ColorId = id
  }
  if(category) {
      let { id } = await Category.findOne({
        where: { name: category }
      })
      CategoryId = id
  }
  if(size) {
      let { id } = await Size.findOne({
        where: { size }
      })
      SizeId = id
  }

  let imagesPromises = []
  let imagesObjects = []
  if(image.length > 0) {
    image.forEach(img => {
      if(img) {
        imagesPromises.push(
          cloudinary.uploader
          .upload(img)
        )
      }
    })
    if(imagesPromises.length > 0) {
      await Promise.all(imagesPromises)
      .then(responses => {
        return responses.map(res => imagesObjects.push({
          public_id: res.public_id, 
          url: res.url,
        }))
      })
    }
  }

  let [product, created] = await Product.findOrCreate({
    where: { name, ColorId, SizeId, CategoryId },
    defaults: {
      name,
      price,
      description,
      stock,
      available,
      image: imagesObjects,
      ColorId,
      CategoryId,
      SizeId,
    },
  });

  if (!created) {
    let deletePromises = []
    if(imagesObjects.length > 0) {
      imagesObjects.forEach(obj => {
        deletePromises.push(
          cloudinary.uploader
          .destroy(obj.public_id)
        )
      })
      await Promise.all(deletePromises)
    }
    throw new Error("Este producto ya existe");
  }

  return convertSingleProduct(product);
};

const deleteProduct = async (id) => {
  let product = await Product.findOne({
    where: { id }
  })
  if(!product) throw new Error('No se encontro el producto')

  if(product.image) {
    let images = []
    product.image.map(img => images.push(img.public_id))
    
    await Promise.all(images.map(img => cloudinary.uploader.destroy(img)))
  }
  await product.destroy()

  return 'Producto eliminado con exito'
};

const updateProduct = async (id, name, price, description, stock, color, category, size) => {
  const product = await Product.findOne({
    where: { id },
    include: { all: true },
  });

  if (!product) throw new Error("Producto no encontrado");
  if (stock <= 0 || stock === null) product.available = false;
  if (stock > 0) product.available = true;

  if(color) {
    let { id } = await Color.findOne({
      where: { color }
    })
    color = id
  }   
  if(category) {
    let { id } = await Category.findOne({
      where: { name: category }
    })
    category = id
  }
  if(size) {
    let { id } = await Size.findOne({
      where: { size }
    })
    size = id
  }

  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;
  product.stock = stock || product.stock;
  await product.setColor(color)
  await product.setCategory(category)
  await product.setSize(size)
  await product.save();

  return convertSingleProduct(product);
};

const removeImage = async (id, image) => {
  let product = await Product.findOne({
    where: { id }
  })
  if(product) {
    let { result } = await cloudinary.uploader
    .destroy(image)
    if(result == 'ok') {
      let updatedImage = product.image.filter(img => img.public_id != image)
      product.image = updatedImage
      await product.save()
    }else {
      throw new Error('No se ha encontrado la imagen para eliminar')
    }
  }else {
    throw new Error('Producto no encontrado')
  }

  return ('Imagen eliminada correctamente')
}

const addImage = async (id, images) => {
  let product = await Product.findOne({
    where: { id }
  })
  
  let imagesPromises = []
  let imagesObjects = []
  if(images.length > 0) {
    images.forEach(img => {
      if(img) {
        imagesPromises.push(
          cloudinary.uploader
          .upload(img)
        )
      }
    })
    if(imagesPromises.length > 0) {
      await Promise.all(imagesPromises)
      .then(responses => {
        return responses.map(res => imagesObjects.push({
          public_id: res.public_id, 
          url: res.url,
        }))
      })
    }else {
      throw new Error('Campos vacios')
    }
  }else {
    throw new Error('No hay imagenes para añadir')
  }
  product.image = product.image.concat(imagesObjects)
  await product.save()

  return 'Imagen añadida correctamente'
}

const testController = async () => {
  message = {
    from: 'grupo_pf_supergenial@test.com',
    to: 'test@receiver.com',
    subject: 'Test001',
    text: 'This is a test 001 from PF project'
  }
  let emailSended = await sendEmail(message)
  return emailSended
}

module.exports = {
  createProduct,
  getProducts,
  getProductByID,
  deleteProduct,
  updateProduct,
  removeImage,
  addImage,
  testController,
};
