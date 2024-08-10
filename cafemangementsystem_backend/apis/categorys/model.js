const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name must be provided"]
    },
    status: {
        type: Boolean,
        default: true,
        require: [true, "Status must be default"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const CategoryModel = mongoose.model("categorys", categorySchema);
module.exports = CategoryModel