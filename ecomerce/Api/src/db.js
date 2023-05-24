require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_DEPLOY, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const userModel = require("./models/User");
const productModel = require("./models/Product");
const orderModel = require("./models/Order");
const commentModel = require("./models/Comment");
const categoryModel = require("./models/Category");

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
});

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecomerce`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );

userModel(sequelize);
productModel(sequelize);
orderModel(sequelize);
commentModel(sequelize);
categoryModel(sequelize);

const { User, Product, Order, Category, Comment } = sequelize.models;

// Aca vendrian las relaciones

Product.belongsToMany(Order, { through: "Order_line" });
Order.belongsToMany(Product, { through: "Order_line" });

User.hasMany(Comment);
Comment.belongsTo(User);

Product.hasMany(Comment);
Comment.belongsTo(Product);

Product.belongsToMany(Category, { through: "Product_Category" });
Category.belongsToMany(Product, { through: "Product_Category" });

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User, Comment } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
