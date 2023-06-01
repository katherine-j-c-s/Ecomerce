const getColors = require("../controllers/colorsControllers");

const getColorsHandler = async (req, res) => {
  try {
    let getAllColors = await getColors();
    res.status(200).json(getAllColors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getColorsHandler,
};
