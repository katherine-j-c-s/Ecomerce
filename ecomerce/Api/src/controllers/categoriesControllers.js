const { Category } = require("../db");

const getCategories = async () => {
  let categories = [
    { name: "Remeras" },
    { name: "Pantalones" },
    { name: "Calzado" },
    { name: "Calzas" },
    { name: "Camperas" },
    { name: "Buzos" },
    { name: "Shorts" },
    { name: "Trajes de Baño" },
    { name: "Medias" },
    { name: "Accesorios" },
    { name: "Gorras" },
  ];

  const count = await Category.count();
  if (count === 0) {
    return Category.bulkCreate(categories);
  } else {
    const temps = await Category.findAll();
    return temps;
  }
};

module.exports = getCategories;
