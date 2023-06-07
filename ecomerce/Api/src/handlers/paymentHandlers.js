const mercadopago = require("mercadopago");
const {
  createOrder,
  success,
  failure,
  pending,
} = require("../controllers/paymentControllers");

const createOrderHandler = async (req, res) => {
  try {
    const createOrders = await createOrder();

    res.status(200).json(createOrders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const successHandler = async (req, res) => {
  try {
    const succesS = await success();

    res.status(200).json(succesS);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const pendingHandler = async (req, res) => {
  try {
    const pendinG = await pending();

    res.status(200).json(pendinG);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const failureHandler = async (req, res) => {
  try {
    const failurE = await failure();

    res.status(200).json(failurE);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const webhookHandler = async (req, res) => {
  const payment = req.query;

  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);
    }
    res.status(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrderHandler,
  successHandler,
  webhookHandler,
  failureHandler,
  pendingHandler,
};
