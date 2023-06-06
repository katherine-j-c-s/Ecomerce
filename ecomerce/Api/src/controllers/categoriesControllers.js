const { Category } = require("../db");

const getCategories = async () => {
  let categories = [
    { name: "remeras" },
    { name: "pantalones" },
    { name: "calzado" },
    { name: "calzas" },
    { name: "camperas" },
    { name: "buzos" },
    { name: "shorts" },
    { name: "trajes de baño" },
    { name: "medias" },
    { name: "accesorios" },
    { name: "gorras" },
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
