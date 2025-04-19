export const isAdmin = (req, res, next) => {
    // Esto es solo un ejemplo simple.
    if (req.user && req.user.role === 'admin') {
      return next();
    } else {
      return res.status(403).json({ error: 'Acceso denegado. Solo para administradores.' });
    }
  };
  