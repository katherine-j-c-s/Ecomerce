require("dotenv").config();
const { Sequelize } = require("sequelize");
const { ENVIROMENT, DB_DEPLOY, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const userModel = require("./models/User");
const productModel = require("./models/Product");
const orderModel = require("./models/UserOrder");
const commentModel = require("./models/Comment");
const categoryModel = require("./models/Category");
const colorModel = require("./models/Color");
const sizeModel = require("./models/Size");
const visitModel = require("./models/Visit")


let sequelize
if(ENVIROMENT === 'local') {
  sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`,
    {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
  );
}
if(ENVIROMENT === 'deploy') {
  sequelize = new Sequelize(DB_DEPLOY, {
    logging: false,
    native: false,
  });
}


userModel(sequelize);
productModel(sequelize);
orderModel(sequelize);
commentModel(sequelize);
categoryModel(sequelize);
colorModel(sequelize);
sizeModel(sequelize);
visitModel(sequelize);


const { User, Product, UserOrder, Category, Comment, Color, Size, Visit } =
  sequelize.models;

//  Aca vendrian las relaciones

User.hasMany(UserOrder);
UserOrder.belongsTo(User);

UserOrder.hasMany(Product);
Product.belongsTo(UserOrder);

User.hasMany(Comment);
Comment.belongsTo(User);

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
