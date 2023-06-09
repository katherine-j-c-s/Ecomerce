const passport = require("passport");

function ensureAuthenticated(req, res, next) {
  if (req.session.passport && req.session.passport.user) {
    // El usuario está autenticado, permitir continuar con la solicitud
    return next();
  }
  // El usuario no está autenticado, devolver un error de autenticación
  res.status(401).json({ error: "No autenticado" });
}

module.exports = { ensureAuthenticated };
