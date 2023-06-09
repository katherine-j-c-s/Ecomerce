const mercadoPago = require("mercadopago");
const { Order, User, Product } = require("../db");

const createOrder = async (carrito) => {
  mercadoPago.configure({
    access_token:
      "TEST-1606124246394165-053111-e5d16fb912668406a6c0f58b0b732c64-1387424624",
  });

  let items = carrito[0].products.map((element) => {
    return {
      title: element.name,
      unit_price: parseInt(element.price),
      quantity: element.quantity,
      currency_id: carrito[0].currency_id,
      id: element.id,
    };
  });

  console.log(items);

  await Order.create({
    dni: carrito[0].dni,
    city: carrito[0].locality,
    address: carrito[0].address,
    phone: carrito[0].phone,
    postal: carrito[0].postal,
    total: carrito[0].total,
    paymentMethod: "Mercado Pago",
    status: "in_process",
    products: items,
  });

  await Promise.all(
    items.map(async (item) => {
      let producto = await Product.findOne({
        where: {
          id: item.id,
        },
      });
      console.log("antes --->" + producto.stock);
      console.log(item.quantity);
      producto.stock = producto.stock - item.quantity;
      console.log("despues --->" + producto.stock);
      await producto.save();
    })
  );

  const dni = carrito[0].dni;

  const result = await mercadoPago.preferences.create({
    items: items,
    back_urls: {
      success: `https://ecomerce-production-8f61.up.railway.app/payment/success/${dni}`,
      failure: `https://ecomerce-production-8f61.up.railway.app/payment/failure/${dni}`,
    },
    notification_url:
      "https://ecomerce-production-8f61.up.railway.app/payment/webhook",
  });

  return result.body.init_point;
};

const failure = async (dni) => {
  const orden = await Order.findOne({
    where: {
      dni: dni,
      status: "in_process",
    },
  });

  await Promise.all(
    orden.products.map(async (item) => {
      let producto = await Product.findOne({
        where: {
          id: item.id,
        },
      });
      producto.stock = producto.stock + item.quantity;
      await producto.save();
    })
  );

  return dni;
};

const success = async (dni) => {
  const orden = await Order.findOne({
    where: {
      dni: dni,
      status: {
        [Op.or]: ["in_process", "rejected"],
      },
    },
  });

  if (orden) {
    orden.status = "fullfilled";
    await orden.save();
  }
};

module.exports = {
  createOrder,
  failure,
  success,
};
