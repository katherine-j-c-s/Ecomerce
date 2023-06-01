const { Router } = require("express");

const { getSizesHandler } = require("../handlers/sizesHandlers");

const sizesRouter = Router();

sizesRouter.get("/", getSizesHandler);

module.exports = sizesRouter;
