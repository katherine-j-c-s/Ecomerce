const getSizes = require("../controllers/sizesControllers");

const getSizesHandler = async (req, res) => {
  try {
    let getAllSizes = await getSizes();
    res.status(200).json(getAllSizes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getSizesHandler,
};
