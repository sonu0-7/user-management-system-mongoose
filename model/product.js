const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    
}, {timestamps: true});

const Product = mongoose.model("product", productSchema);

module.exports = Product;