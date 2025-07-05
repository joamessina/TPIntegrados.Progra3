function requireLogin(req, res, next) {
  if (req.session && req.session.usuario) {
    return next();
  }

  if (req.path === '/login' || req.path === '/logout') {
    return next();
  }

  res.redirect('/admin/login');
}

module.exports = requireLogin;
