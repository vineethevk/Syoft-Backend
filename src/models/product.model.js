const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_name: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_description: { type: String, required: true },
    inventory_count: { type: Number, required: true },
    token: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("product", productSchema);