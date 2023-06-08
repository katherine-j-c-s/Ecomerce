const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const { createUser } = require("./controllers/usersController");

const path = require("path");

// ...

const defaultImage = path.join(
  __dirname,
  "..",
  "Client",
  "src",
  "assets",
  "default-image.png"
);

const { User } = require("./db"); // Asegúrate de importar el modelo User correctamente

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    // Almacena la identificación única del usuario en la sesión
    console.log(user.mail);

    done(null, user.mail);
  });

  passport.deserializeUser(async (email, done) => {
    console.log("mail del usuario", email);
    try {
      // Recupera el objeto de usuario utilizando la identificación almacenada en la sesión
      const user = await User.findOne({ where: { mail: email } });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL:
          "https://ecomerce-production-8f61.up.railway.app/users/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        // Verificar si el usuario ya existe en tu base de datos usando profile.id o profile.email
        console.log(profile);
        const user = await User.findOne({
          where: { mail: profile.emails[0].value },
        });

        // Si el usuario ya existe, puedes autenticarlo llamando a done() con el usuario como argumento
        // done(null, usuario);
        if (user) {
          return done(null, user);
        } else {
          // Si el usuario no existe, lo creas y lo autenticas

          const newUser = {
            googleId: profile.id,
            mail: profile.emails[0].value,
            first_name:
              profile.displayName.split(" ")[0] || profile.displayName,
            last_name: profile.displayName.split(" ")[1] || profile.displayName,
            image:
              profile.photos && profile.photos.length > 0
                ? profile.photos[0].value
                : defaultImage,
          };

          const createdUser = await createUser(newUser);
          return done(null, createdUser);
        }
      }
    )
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: "mail", // Campo del formulario para el correo electrónico
        passwordField: "password", // Campo del formulario para la contraseña
      },
      async (mail, password, done) => {
        try {
          // Encuentra al usuario en la base de datos por correo electrónico
          const user = await User.findOne({ where: { mail: mail } });

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
