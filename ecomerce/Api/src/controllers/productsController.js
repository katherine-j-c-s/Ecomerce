const { Product } = require('../db')

const convertAllProducts = (res) => {
    let { id, name, price, image, Color, Size } = res
    return newObj = { 
        id, 
        name, 
        price, 
        color: Color, 
        size: Size, 
        image,
    }
}

const convertSingleProduct = (res) => {
    let { id, name, price, image, description, stock, available, Comments, Category, Color, Size } = res

    return newObj = {
        id,
        name,
        price,
        description,
        stock,
        available,
        category: Category,
        color: Color,
        size: Size,
        comments: Comments,
        image,
    }
}


const getProducts = async () => {
    let allProducts = []
    await Product.findAll({include: { all: true }})
    .then(responses => {
        responses.map(res => allProducts.push(convertAllProducts(res.dataValues)))
    })


    // Data hardcodeada
    return allProducts
}

const getProductByID = async (id) => {
    let product = await Product.findOne({
        where: { id },
        include: { all: true }
    })
    if(product === null) throw new Error('No se encuentra el producto')

    return convertSingleProduct(product)
}

const createProduct = async (name, price, description, image, stock) => {
    let available
    if(stock === 0 || stock === null) available = false

    let [product, created] = await Product.findOrCreate({
        where: { name },
        defaults: {
            name,
            price,
            description,
            image,
            stock,
            available,
        }
    })

    if(!created) {
        throw new Error('Este producto ya existe')
    }

    return convertSingleProduct(product)
}

const deleteProduct = async (id) => {
    let removedProduct = await Product.destroy({
        where: { id }
    })

    if(removedProduct === 1) return 'Producto eliminado con exito'
    if(removedProduct === 0) throw new Error('No se pudo eliminar el producto')
}

const updateProduct = async (id, name, price, description, image, stock) => {
    const product = await Product.findOne({
        where: { id },
        include: { all: true },
    })
    
    if(!product) throw new Error('Producto no encontrado')
    if(stock <= 0 || stock === null) product.available = false
    if(stock > 0) product.available = true

    product.name = name || product.name
    product.price = price || product.price
    product.description = description || product.description
    product.image = image || product.image
    product.stock = stock || product.stock
    await product.save()
    
    return convertSingleProduct(product)
}

module.exports = {
    createProduct,
    getProducts,
    getProductByID,
    deleteProduct,
    updateProduct,
}