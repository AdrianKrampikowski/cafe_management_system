const Category = require("../categorys/model");
const Product = require("../product/model");
const Bill = require("../bills/model");

const getDetails = async (req, resp) => {
    try {
        categoryCount = await Category.countDocuments({})
        productCount = await Product.countDocuments({})
        billCount = await Bill.countDocuments({})
        const details = {
            categoryCount: categoryCount,
            productCount: productCount,
            billCount: billCount,
        };
        resp.status(200).json(details);
    } catch (error) {
        resp.status(400).json({ message: error.message })
    }
}

module.exports = { getDetails };
