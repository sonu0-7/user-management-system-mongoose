const USER = require("../model/user");

function isUserAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/user/login");
  }
}

function isLogin(req, res, next) {
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
}

module.exports = {
  isUserAuthenticated,
  isLogin,
};
