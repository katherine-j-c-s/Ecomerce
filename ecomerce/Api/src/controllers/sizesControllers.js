const { Size } = require("../db");

const getSizes = async () => {
  let sizes = [
    { size: "xs" },
    { size: "s" },
    { size: "m" },
    { size: "l" },
    { size: "xl" },
    { size: "xxl" },
    { size: "xxxl" },
    { size: "35" },
    { size: "36" },
    { size: "37" },
    { size: "38" },
    { size: "39" },
    { size: "40" },
    { size: "41" },
    { size: "42" },
    { size: "43" },
    { size: "44" },
    { size: "45" },
    { size: "2" },
    { size: "4" },
    { size: "6" },
    { size: "8" },
    { size: "10" },
    { size: "12" },
    { size: "14" },
    { size: "16" },
    { size: "18" },
    { size: "20" },
  ];

  const count = await Size.count();
  if (count === 0) {
    return Size.bulkCreate(sizes);
  } else {
    const temps = await Size.findAll();
    return temps;
  }
};

module.exports = getSizes;
