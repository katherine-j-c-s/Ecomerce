const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { User } = require("./db"); // Asegúrate de importar el modelo User correctamente

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    // Almacena la identificación única del usuario en la sesión
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      // Recupera el objeto de usuario utilizando la identificación almacenada en la sesión
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "mail", // Campo del formulario para el correo electrónico
        passwordField: "password", // Campo del formulario para la contraseña
      },
      async (mail, password, done) => {
        try {
          // Encuentra al usuario en la base de datos por correo electrónico
          const user = await User.findOne({ where: { mail } });

          // Si no se encuentra el usuario o la contraseña no coincide, devuelve un mensaje de error
          if (!user || !bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: "Credenciales inválidas" });
          }

          // Si todo está bien, devuelve el usuario autenticado
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
