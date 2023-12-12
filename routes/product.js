const express = require("express");
const {
  getProductPage,
  createProduct,
  deleteProduct,
  editProduct,
} = require("../controller/product");
const { isUserAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.get("/", isUserAuthenticated, getProductPage);
router.post("/product", createProduct);
router.get("/product/delete", deleteProduct);
router.post("/product/edit/:productId", editProduct);

module.exports = router;
