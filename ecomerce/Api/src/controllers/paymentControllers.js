const mercadoPago = require("mercadopago");

const createOrder = async () => {
  mercadoPago.configure({
    access_token:
      "TEST-1606124246394165-053111-e5d16fb912668406a6c0f58b0b732c64-1387424624",
  });

  const result = await mercadoPago.preferences.create({
    items: [
      { title: "Laptop", unit_price: 500000, currency_id: "ARS", quantity: 1 },
    ],
    back_urls: {
      success: `http://localhost:3001/payment/success`,
      pending: `http://localhost:3001/payment/pending`,
      failure: `http://localhost:3001/payment/failure`,
    },
    notification_url: "https://d01e-200-123-44-178.sa.ngrok.io/payment/webhook",
  });

  return result.body;
};

const success = async () => {
  return "success";
};

const pending = async () => {
  return "pending";
};

const failure = async () => {
  return "failure";
};

module.exports = {
  createOrder,
  success,
  failure,
  pending,
};
