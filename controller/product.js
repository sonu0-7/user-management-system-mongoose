const Product = require("../model/product");

async function getProductPage(req, res) {
  try {
    const userId = req.session.user._id;
    const userName = req.session.user.name;
    const allProducts = await Product.find({createdBy : userId});
    return res.render("home", {products : allProducts, userName});
  } catch (error) {
    return res.render("home");
  }
}

async function createProduct(req, res) {
  try {
    const { productTitle, productName } = req.body;
    const product = await Product.create({ productTitle, productName, createdBy: req.session.user._id});
    if (!product) res.status(400).json({ Err: "Error product hasn't created" });
    return res.redirect("/");
  } catch (error) {
    return res.end("Something went wrong...");
  }
}

async function deleteProduct(req, res) {
  try {
    const productId = req.query.productId;
    await Product.findOneAndDelete(productId);
    return res.redirect("/");
  } catch (error) {}
}

async function editProduct(req, res) {
  try {
    const productId = req.params.productId;
    const {productTitle, productName} = req.body;
    const updateProduct = await Product.findByIdAndUpdate(productId, {productTitle, productName}, { new: true });
    return res.redirect("/");
  } catch (error) {}
}

module.exports = {
  getProductPage,
  createProduct,
  deleteProduct,
  editProduct,
};