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
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`,
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

const { User, Product, Order, Category, Comment, Color, Size } =
  sequelize.models;

// Aca vendrian las relaciones

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Product);
Product.belongsTo(Order);

Order.hasMany(Comment);
Comment.belongsTo(Order);

Product.hasMany(Comment);
Comment.belongsTo(Product);

Category.hasMany(Product);
Product.belongsTo(Category);

Color.hasMany(Product);
Product.belongsTo(Color);

Size.hasMany(Product);
Product.belongsTo(Size);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User, Comment } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
