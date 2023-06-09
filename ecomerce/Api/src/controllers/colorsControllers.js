const { Color } = require("../db");

const getColors = async () => {
  let colors = [
    {
      color: "rojo",
    },
    {
      color: "negro",
    },
    {
      color: "blanco",
    },
    {
      color: "gris",
    },
    {
      color: "azul",
    },
    {
      color: "verde",
    },
    {
      color: "amarillo",
    },
    {
      color: "naranja",
    },
    {
      color: "beige",
    },
    {
      color: "rosa",
    },
    {
      color: "morado",
    },
    {
      color: "cian",
    },
  ];

  const count = await Color.count();
  if (count === 0) {
    return Color.bulkCreate(colors);
  } else {
    const temps = await Color.findAll();
    return temps;
  }
};

module.exports = getColors;
