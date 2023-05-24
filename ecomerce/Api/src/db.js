require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_DEPLOY, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const fs = require("fs");
const path = require("path");

// const sequelize = new Sequelize(DB_DEPLOY, {
//   logging: false,
//   native: false,
// });

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecomerce`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Product, Comment, Rol } = sequelize.models;

// Aca vendrian las relaciones

User.belongsToMany(Product, { through: "Compras" });
Product.belongsToMany(User, { through: "Compras" });

Cart.belongsToMany(Product, { through: "CartDetail" });
Product.belongsToMany(Cart, { through: "CartDetail" });

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Comment, { foreignKey: "id" });
Comment.belongsTo(User);

Product.hasMany(Comment, { foreignKey: "id" });
Comment.belongsTo(Product);

Rol.hasMany(User, { foreignKey: "id" });
User.belongsTo(Rol);

Color.hasMany(Product, { foreignKey: "id" });
Product.belongsTo(Color);

Size.hasMany(Product, { foreignKey: "id" });
Product.belongsTo(Size);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User, Comment } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
