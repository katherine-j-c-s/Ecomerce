const { Router } = require("express");

const { getColorsHandler } = require("../handlers/colorsHandlers");

const colorsRouter = Router();

colorsRouter.get("/", getColorsHandler);

module.exports = colorsRouter;
