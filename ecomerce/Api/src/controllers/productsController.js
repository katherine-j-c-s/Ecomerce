const { Product } = require("../db");

const convertAllProducts = (res) => {
  let { id, name, price, image, Color, Size } = res;
  return (newObj = {
    id,
    name,
    price,
    color: Color,
    size: Size,
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
    category: Category,
    color: Color,
    size: Size,
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

  // Data hardcodeada
  let hard = [
    {
      name: "Adicolor Heritage Now Flared",
      price: 61999,
      description:
        "Cintura elástica con cordón, Punto 100% poliéster reciclado Bolsillos frontales de ojal, Color del artículo: Scarlet ,Número de artículo: IB2020",
      stock: 1000,
      image: [
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2e596edc44884006a9cbaef3011a34de_9366/Pantalon_Adicolor_Heritage_Now_Flared_Rojo_IB2020_HM1.jpg",
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1fe12682d72f4b03a08caef3011a3dd4_9366/Pantalon_Adicolor_Heritage_Now_Flared_Rojo_IB2020_HM3_hover.jpg",
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/57054d7dd2714be79246aef3011a4a84_9366/Pantalon_Adicolor_Heritage_Now_Flared_Rojo_IB2020_HM4.jpg",
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e99818f9c534446a8806aef3011aa3b1_9366/Pantalon_Adicolor_Heritage_Now_Flared_Rojo_IB2020_HM5.jpg",
      ],
      available: true,
      category: "pantalones",
      color: "rojo",
      size: "40",
    },
    {
      name: "Adicolor Heritage Now",
      price: 58999,
      description:
        "La colección Adicolor Heritage Now se inspira en diseños y siluetas clásicos. Con el sello inconfundible de adidas, sus prendas recrean modelos vintage con materiales y texturas de gran calidad y colores vibrantes — Florence Marrinier y Lena Sophie Anders, diseñadoras sénior de adidas Originals.Inspirado en un clásico modelo vintage, el pantalón Adicolor Heritage Now es sinónimo de confort y estilo. Se ha confeccionado en un tejido de algodón de primera calidad con un corte clásico de tiro alto y una combinación de colores pensada para alegrar cada momento del día. Luce detalles acanalados grueso en los puños y el ribete de los bolsillos y el logotipo del trifolio que le confieren un toque vintage y deportivo.",
      stock: 1000,
      image: [
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/872aeb83434b4343bcb7af0100c2bbfa_9366/Pantalon_Adicolor_Heritage_Now_Verde_IB2054_HM1.jpg",
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0603ba9fc9e64b38ae65af0100c2c39c_9366/Pantalon_Adicolor_Heritage_Now_Verde_IB2054_HM3_hover.jpg",
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/6a8edd549b1940b38015af0100c2cac6_9366/Pantalon_Adicolor_Heritage_Now_Verde_IB2054_HM4.jpg",
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/279d031f4efc43d7b8bdaf0100c2ff71_9366/Pantalon_Adicolor_Heritage_Now_Verde_IB2054_HM5.jpg",
      ],
      available: true,
      category: "pantalones",
      color: "verde",
      size: "40",
    },
    {
      name: "Adicolor Heritage Now",
      price: 58999,
      description:
        "La colección Adicolor Heritage Now se inspira en diseños y siluetas clásicos. Con el sello inconfundible de adidas, sus prendas recrean modelos vintage con materiales y texturas de gran calidad y colores vibrantes — Florence Marrinier y Lena Sophie Anders, diseñadoras sénior de adidas Originals.Inspirado en un clásico modelo vintage, el pantalón Adicolor Heritage Now es sinónimo de confort y estilo. Se ha confeccionado en un tejido de algodón de primera calidad con un corte clásico de tiro alto y una combinación de colores pensada para alegrar cada momento del día. Luce detalles acanalados grueso en los puños y el ribete de los bolsillos y el logotipo del trifolio que le confieren un toque vintage y deportivo.",
      stock: 1000,
      image: [
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4bf9762da73f4ffa9884aef30120fe54_9366/Pantalon_Adicolor_Heritage_Now_Azul_IB2055_HM1.jpg",
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fce2b4d5d3784dc8a9a5aef301210755_9366/Pantalon_Adicolor_Heritage_Now_Azul_IB2055_HM3_hover.jpg",
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/795f17920798499980bfaef301211095_9366/Pantalon_Adicolor_Heritage_Now_Azul_IB2055_HM4.jpg",
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/aa6b1bb7abb146d9befeaef301214c6c_9366/Pantalon_Adicolor_Heritage_Now_Azul_IB2055_HM5.jpg",
      ],
      available: true,
      category: "pantalones",
      color: "azul",
      size: "40",
    },
    {
      name: "Deportivo Python",
      price: 58999,
      description:
        "Es hora de redefinir el clásico traje de poder. Este pantalón deportivo adidas actualiza el icónico diseño Firebird de los años 80 con un estampado de piel de serpiente. El ajuste ceñido eleva el look y le aporta la dosis justa de actitud a tu blazer clásico, suéter o camisa de botones. Al menos un 70% de este producto está hecho de una mezcla de materiales reciclados y renovables.",
      stock: 1000,
      image: [
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/15d37100f5ba4b1aaa5aaf0400bcde06_9366/Pantalon_Deportivo_Python_Negro_IC6083_21_model.jpg",
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f0f995617e9340aca4bfaf0400bce971_9366/Pantalon_Deportivo_Python_Negro_IC6083_23_hover_model.jpg",
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/bd02664926a649bc8951af0400bcf1f7_9366/Pantalon_Deportivo_Python_Negro_IC6083_25_model.jpg",
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/6cd6624cf09a4b079db7af0400bd19bb_9366/Pantalon_Deportivo_Python_Negro_IC6083_01_laydown.jpg",
      ],
      available: true,
      category: "pantalones",
      color: "gris",
      size: "40",
    },
    {
      name: "Nike Court Vision Low Nex Nature",
      price: 38999,
      description:
        "¿Amas el look clásico del básquetbol de los años 80, pero también te apasiona la cultura acelerada de los partidos actuales? Te presentamos el Nike Court Vision Low. Un clásico rediseñado con al menos un 20% de materiales reciclados por peso, su parte superior nítida y los revestimientos cosidos mantienen el alma del estilo original. El cuello del tobillo de corte low y acolchado brinda elegancia y comodidad.",
      stock: 1000,
      image: [
        "https://media.karousell.com/media/photos/products/2022/12/19/nike_mens_court_vision_low_nex_1671425915_61cb113e_progressive.jpg",
        "https://media.karousell.com/media/photos/products/2022/12/19/nike_mens_court_vision_low_nex_1671425915_e1dac9c2_progressive.jpg",
        "https://media.karousell.com/media/photos/products/2022/12/19/nike_mens_court_vision_low_nex_1671425915_8cd0abbd_progressive.jpg",
      ],
      available: true,
      category: "calzado",
      color: "negro",
      size: "43",
    },
    {
      name: "Nike Dunk High Retro",
      price: 32008.377,
      description:
        "Siéntete como toda una estrella de los 80 con el Nike Dunk High. Este calzado clásico se ve rediseñado justamente para los niños. El diseño superduradero y los colores del modelo original lo hacen una jugada perfecta. Confeccionado para durar. El cuero es duradero y fácil de limpiar. Looks de herencia. La confección de la lengüeta y el cuello, junto con las perforaciones sobre la zona de la punta, le dan un look icónico fiel al original. Tracción durante todo el día. La suela de goma y el patrón gráfico a lo largo brindan tracción duradera.",
      stock: 300,
      image: [
        "https://media.karousell.com/media/photos/products/2023/5/22/nike_dunk_high_retro_se_mens_s_1684756351_47896705_progressive.jpg",
      ],
      available: true,
      category: "calzado",
      color: "blanco",
      size: "43",
    },
    {
      name: "WIND HALF-ZIP ROSE",
      price: 26990,
      description:
        "Bloquea la resistencia al viento con este nuevo buzito medio cierre diseñado para mantener incluso el peor clima fuera mientras entrenas. Con ancho regulable en la cintura de espalda para mayor comodidad y un calce a tu medida, su capucha con visera incorporada cubre la parte inferior de tu cara del clima y hace de esta chaqueta resistente al viento y el agua. Ve un paso más allá esta temporada y dalo todo en tus entrenamientos con esta camperita de running.",
      stock: 100,
      image: [
        "https://cdn.shopify.com/s/files/1/0430/9594/9479/products/C-WINDHALFZIPROSEEDITADA-3_700x.jpg?v=1683656290",
        "https://cdn.shopify.com/s/files/1/0430/9594/9479/products/C-WINDHALFZIPROSEEDITADA-1_700x.jpg?v=1683656290",
        "https://cdn.shopify.com/s/files/1/0430/9594/9479/products/C-WINDHALFZIPROSEEDITADA-2_700x.jpg?v=1683656290",
        "https://cdn.shopify.com/s/files/1/0430/9594/9479/products/C-WINDHALFZIPROSEEDITADA-4_700x.jpg?v=1683656290",
      ],
      available: true,
      category: "camperas",
      color: "rosa",
      size: "l",
    },
    {
      name: "WIND HALF-ZIP ROSE",
      price: 26990,
      description:
        "Bloquea la resistencia al viento con este nuevo buzito medio cierre diseñado para mantener incluso el peor clima fuera mientras entrenas. Con ancho regulable en la cintura de espalda para mayor comodidad y un calce a tu medida, su capucha con visera incorporada cubre la parte inferior de tu cara del clima y hace de esta chaqueta resistente al viento y el agua. Ve un paso más allá esta temporada y dalo todo en tus entrenamientos con esta camperita de running.",
      stock: 100,
      image: [
        "https://cdn.shopify.com/s/files/1/0430/9594/9479/products/C-WINDHALFZIPBEIGEEDITADA-3_700x.jpg?v=1683656292",
        "https://cdn.shopify.com/s/files/1/0430/9594/9479/products/C-WINDHALFZIPBEIGEEDITADA-2_700x.jpg?v=1683656292",
        "https://cdn.shopify.com/s/files/1/0430/9594/9479/products/C-WINDHALFZIPBEIGEEDITADA-4_700x.jpg?v=1683656292",
      ],
      available: true,
      category: "camperas",
      color: "beige",
      size: "l",
    },
    {
      name: "WIND HALF-ZIP ROSE",
      price: 26990,
      description:
        "Bloquea la resistencia al viento con este nuevo buzito medio cierre diseñado para mantener incluso el peor clima fuera mientras entrenas. Con ancho regulable en la cintura de espalda para mayor comodidad y un calce a tu medida, su capucha con visera incorporada cubre la parte inferior de tu cara del clima y hace de esta chaqueta resistente al viento y el agua. Ve un paso más allá esta temporada y dalo todo en tus entrenamientos con esta camperita de running.",
      stock: 100,
      image: [
        "https://cdn.shopify.com/s/files/1/0430/9594/9479/products/C-WINDHALFZIPBLACKEDITADA-3_700x.jpg?v=1683656285",
        "https://cdn.shopify.com/s/files/1/0430/9594/9479/products/C-WINDHALFZIPBLACKEDITADA-2_700x.jpg?v=1683656285",
        "https://cdn.shopify.com/s/files/1/0430/9594/9479/products/C-WINDHALFZIPBLACKEDITADA-4_700x.jpg?v=1683656285",
      ],
      available: true,
      category: "camperas",
      color: "negro",
      size: "l",
    },
  ];

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

const createProduct = async (name, price, description, image, stock) => {
  let available;
  if (stock === 0 || stock === null) available = false;

  let [product, created] = await Product.findOrCreate({
    where: { name },
    defaults: {
      name,
      price,
      description,
      image,
      stock,
      available,
    },
  });

  if (!created) {
    throw new Error("Este producto ya existe");
  }

  return convertSingleProduct(product);
};

const deleteProduct = async (id) => {
  let removedProduct = await Product.destroy({
    where: { id },
  });

  if (removedProduct === 1) return "Producto eliminado con exito";
  if (removedProduct === 0) throw new Error("No se pudo eliminar el producto");
};

const updateProduct = async (id, name, price, description, image, stock) => {
  const product = await Product.findOne({
    where: { id },
    include: { all: true },
  });

  if (!product) throw new Error("Producto no encontrado");
  if (stock <= 0 || stock === null) product.available = false;
  if (stock > 0) product.available = true;

  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;
  product.image = image || product.image;
  product.stock = stock || product.stock;
  await product.save();

  return convertSingleProduct(product);
};

module.exports = {
  createProduct,
  getProducts,
  getProductByID,
  deleteProduct,
  updateProduct,
};
