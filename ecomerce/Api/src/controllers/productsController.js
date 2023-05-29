const { Product } = require('../db')


const getProducts = async () => {
    let products = await Product.findAll()

    return products
}

const getProductByID = async (id) => {
    let product = await Product.findOne({
        where: { id }
    })

    return product
}

const createProduct = async (name, price, description, rating, image, stock) => {
    let [product, created] = await Product.findOrCreate({
        where: { name },
        defaults: {
            name,
            price,
            description,
            stock,
            rating,
            image
        }
    })

    if(!created) {
        await Product.increment('stock', {by: 1})
    }

    return product
}

const deleteProduct = async (id) => {
    let removedProduct = await Product.destroy({
        where: { id }
    })

    return removedProduct
}

const updateProduct = async (name, price, description, rating, image) => {
    let data = {name, price, description, rating, image}
    let newData = {}

    for(el in data) {
        if(data[el] !== '' || data[el] !== null || data[el] !== 'undefined') {
            newData[el] = data[el]
        }
    }
    let updatedProduct = await Product.update({ newData }, { name })

    return updatedProduct
}

module.exports = {
    createProduct,
    getProducts,
    getProductByID,
    deleteProduct,
    updateProduct,
}