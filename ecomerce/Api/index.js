require("dotenv").config();
const app = require("./src/app.js");
const { conn } = require("./src/db.js");
const port = process.env.PORT || 3001;

conn
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server corriendo en el puerto ${port}`);
    });
  })
  .catch((err) => console.log(err));