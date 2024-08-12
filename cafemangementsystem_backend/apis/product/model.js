const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    categoryID: {
        type: String,
        required: [true, "CategoryID is required"]
    },
    status: {
        type: Boolean,
        required: [true, "Status is required"],
        default: true

    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;