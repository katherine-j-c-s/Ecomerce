const { Router } = require("express");

const {
  createOrderHandler,
  successHandler,
  webhookHandler,
} = require("../handlers/paymentHandlers");

const paymentRouter = Router();

paymentRouter.get("/create-order", createOrderHandler);

paymentRouter.get("/success", successHandler);

paymentRouter.get("/webhook", webhookHandler);

module.exports = paymentRouter;
