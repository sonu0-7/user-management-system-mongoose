const { USER, saveUser } = require("../model/user");
const bcrypt = require("bcrypt");

async function handleRegister(req, res) {
  try {
    console.log("Register body", req.body)
    const { name, email, password } = req.body;
    const userData = { name, email, password };
    
    saveUser(userData)
      .then((savedUser) => {
        console.log("User saved:", savedUser);
        res.redirect("/user/login");
      })
      .catch((error) => {
        console.error("Error saving user:", error.message);
        res.redirect("/user/signup");
      });
  } catch (error) {
    return res.redirect("/user/signup");
  }
}

function renderRegisterPage(req, res) {
  return res.render("signup");
}

async function renderLoginPage(req, res) {
  return res.render("login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await USER.findOne({ email });
  if(user) {
    await bcrypt.compare(password, user.password);
    req.session.user = user;
  }
  if (!user) return res.render("login", { error: "Invalid email or password" });
  return res.redirect("/");
}

async function handleUserLogout(req, res){
  req.session.user = null;
  res.redirect("/user/login");
  }

module.exports = {
  handleRegister,
  renderRegisterPage,
  renderLoginPage,
  handleUserLogin,
  handleUserLogout,
};
