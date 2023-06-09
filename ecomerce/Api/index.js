require("dotenv").config();
const app = require("./src/app.js");
const { conn } = require("./src/db.js");
const port = process.env.PORT || 3001;

conn
  .sync({ force: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server corriendo en el puerto ${port}`); // eslint-disable-line no-console
    });
  })
  .catch((err) => console.log(err));
