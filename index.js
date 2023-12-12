const express = require("express");
const mongooe = require("mongoose");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv").config();
const cookieSession = require("cookie-session");

const connectToMongoDB = require("./connection");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const isUserAuthenticated = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT || 9897;

function convertTimeToUTC530(maxAgeMinutes){
  // Calculate the offset in milliseconds for UTC+5:30
  // const offsetMilliseconds = (5 * 60 + 30) * 60 * 1000;
  // Convert maxAge to milliseconds and add the offset
  const maxAgeMilliseconds = maxAgeMinutes 
  *60 * 1000;
  return maxAgeMilliseconds;
}

// Express-Session
app.use(cookieSession({
  name: "aisTech",
  secret: [process.env.secret],
  maxAge: convertTimeToUTC530(5),
}));

// Connection
connectToMongoDB("mongodb://127.0.0.1:27017/user-management-system").then(() =>
  console.log("Your connection is established with mongoDB")
);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Set the view engine
app.set("view engine", "html");

// Configuration of nunjucks
nunjucks.configure("view", {
  autoescape: true,
  express: app,
});

// Router
app.use("/user", userRouter);
app.use("/", productRouter);

app.listen(PORT, () => {
  console.log(`The Server is Up on -> http://localhost:${PORT}`);
});