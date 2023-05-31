const { Router } = require("express");

const {
  createOrderHandler,
  successHandler,
  webhookHandler,
  failureHandler,
  pendingHandler,
} = require("../handlers/paymentHandlers");

const paymentRouter = Router();

paymentRouter.post("/create-order", createOrderHandler);

paymentRouter.get("/success", successHandler);
paymentRouter.get("/failure", failureHandler);
paymentRouter.get("/pending", pendingHandler);

paymentRouter.post("/webhook", webhookHandler);

module.exports = paymentRouter;
