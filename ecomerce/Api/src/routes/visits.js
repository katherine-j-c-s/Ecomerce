const { Router } = require("express");
const getVisitsHandler = require("../handlers/visitsHandler");

const visitsRouter = Router();

visitsRouter.get("/", getVisitsHandler);

module.exports = visitsRouter;