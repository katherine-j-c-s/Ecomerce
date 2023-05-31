const {
  createOrder,
  success,
  webhookC,
} = require("../controllers/paymentControllers");

const createOrderHandler = async (req, res) => {
  try {
    res.send(createOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const successHandler = async (req, res) => {
  try {
    res.send(success);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const webhookHandler = async (req, res) => {
  try {
    res.send(webhookC);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrderHandler,
  successHandler,
  webhookHandler,
};
