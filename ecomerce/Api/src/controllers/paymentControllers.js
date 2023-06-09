const mercadoPago = require("mercadopago");
const { UserOrder, User, Product } = require("../db");
const { Op } = require("sequelize");
const sendEmail = require("../mail/nodemailerConfig");
const sendPurchaseMail = require("../mail/purchaseMail");

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

  const user = await User.findOne({
    where: {
      mail: carrito[0].mail,
    },
  });

  const order = await UserOrder.create({
    email: carrito[0].mail,
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

  // Establecer la relación entre la orden y el usuario
  await order.setUser(user);

  await Promise.all(
    items.map(async (item) => {
      let producto = await Product.findOne({
        where: {
          id: item.id,
        },
      });

      producto.stock = producto.stock - item.quantity;

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
  const orden = await UserOrder.findOne({
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

  await orden.destroy();

  return dni;
};

const success = async (dni) => {
  const orden = await UserOrder.findOne({
    where: {
      dni: dni,
      status: {
        [Op.or]: ["in_process", "rejected"], // Corregido para usar el operador de "o" lógico
      },
    },
  });

  if (orden) {
    orden.status = "completada"; // Corregido para tener una ortografía correcta
    await orden.save();
  }

  if (orden.status == "completada") {
    await sendPurchaseMail(orden.email, orden.id, orden.products);
  }
};

module.exports = {
  createOrder,
  failure,
  success,
};
