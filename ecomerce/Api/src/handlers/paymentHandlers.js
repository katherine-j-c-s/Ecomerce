const {
  createOrder,
  success,
  webhookC,
  failure,
  pending,
} = require("../controllers/paymentControllers");

const createOrderHandler = async (req, res) => {
  try {
    let { carrito } = req.params;
    const createOrders = await createOrder(id);

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
  try {
    const pay = req.query;
    const webhook = await webhookC(pay);

    console.log(req.query);

    res.status(200).json(webhook);
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
