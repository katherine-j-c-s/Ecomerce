const getCategories = require("../controllers/categoriesControllers");

const getCategoriesHandler = async (req, res) => {
  try {
    let getCat = await getCategories();
    res.status(200).json(getCat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getCategoriesHandler,
};
