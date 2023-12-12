function checkSessionExpiration(req, res, next) {
  if (req.session && req.session.cookie && req.session.cookie.maxAge) {
    const now = new Date();
    const sessionExpiration = new Date(req.session.cookie.maxAge);

    if (now > sessionExpiration) {
      // Session has expired, redirect to logout
      return res.redirect("/users/logout");
    }
  }
  next();
}

module.exports = checkSessionExpiration;