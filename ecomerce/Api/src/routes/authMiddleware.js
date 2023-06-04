function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // El usuario está autenticado, permitir continuar con la solicitud
    return next();
  }
  // El usuario no está autenticado, devolver un error de autenticación
  res.status(401).json({ error: "No autenticado" });
}

module.exports = { ensureAuthenticated };
