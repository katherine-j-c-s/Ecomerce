const mercadopago = require("mercadopago");
const {
  createOrder,
  success,
  failure,
} = require("../controllers/paymentControllers");

const createOrderHandler = async (req, res) => {
  try {
    let car = await req.body;
    let carrito = [];

    carrito.push(car);
    console.log(carrito);
    const createOrders = await createOrder(carrito);

    res.status(200).json(createOrders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const successHandler = async (req, res) => {
  try {
    const { dni } = req.params;
    await success(dni);
    res.redirect("https://sportwear.vercel.app/successful");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const pendingHandler = async (req, res) => {
  try {
    res.send("ahi va");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const failureHandler = async (req, res) => {
  try {
    const { dni } = req.params;
    await failure(dni);

    res.redirect("https://sportwear.vercel.app/cart");
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
