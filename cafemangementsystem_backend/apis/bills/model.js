const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    uuid: {
        type: String,
        // required: [true, "Uuid is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    contactNumber: {
        type: String,
        required: [true, "Contact Number is required"]
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment Method is required"]
    },
    total: {
        type: String,
        required: [true, "Total is required"]
    },
    productDetails: {
        type: Object,
        required: [true, "Product Details are required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const BillModel = mongoose.model("bills", billSchema);
module.exports = BillModel;
