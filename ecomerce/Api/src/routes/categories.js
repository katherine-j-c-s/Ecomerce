const { Router } = require("express");

const { getCategoriesHandler } = require("../handlers/categoriesHandlers");

const categoriesRouter = Router();

categoriesRouter.get("/", getCategoriesHandler);

module.exports = categoriesRouter;
