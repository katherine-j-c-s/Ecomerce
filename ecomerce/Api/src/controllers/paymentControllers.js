const mercadoPago = require("mercadopago");
const { Order, User } = require("../db");

const createOrder = async (carrito) => {
  mercadoPago.configure({
    access_token:
      "TEST-1606124246394165-053111-e5d16fb912668406a6c0f58b0b732c64-1387424624",
  });

  let items = carrito[0].productos.map((element) => {
    return {
      title: element.name,
      unit_price: parseInt(element.price),
      quantity: element.cantidad,
      currency_id: carrito[0].moneda,
    };
  });

  console.log(items);

  await Order.create({
    dni: carrito[0].dni,
    city: carrito[0].ciudad,
    address: carrito[0].direccion,
    phone: carrito[0].numero,
    postal: carrito[0].postal,
    total: carrito[0].total,
    paymentMethod: "Mercado Pago",
    status: "in_process",
  });

  const dni = carrito[0].dni;

  const result = await mercadoPago.preferences.create({
    items: items,
    back_urls: {
      success: `http://localhost:3001/payment/success/`,
      failure: `http://localhost:3001/payment/failure/${dni}`,
    },
    notification_url: "https://d01e-200-123-44-178.sa.ngrok.io/payment/webhook",
  });

  return result.body.init_point;
};

const success = async (carrito) => {
  const usuario = await User.findOne({
    where: {
      dni: dni,
      status: "in_process",
    },
  });
  orden.destroy();

  return dni;
};

const failure = async (dni) => {
  const orden = await Order.findOne({
    where: {
      dni: dni,
      status: "in_process",
    },
  });
  orden.destroy();

  return dni;
};

module.exports = {
  createOrder,
  success,
  failure,
};
