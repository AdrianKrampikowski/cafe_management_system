const Category = require("./model");
const Product = require("../product/model");

const createCategory = async (req, resp) => {
    const { name } = req.body
    try {
        let category = await new Category(req.body);
        const existingCategory = await Category.where("name").equals(name).exec();
        if (existingCategory.length < 1) {
            await category.save();
            resp.status(200).json({ message: "Category added" })
        } else {
            resp.status(400).json({ message: "Category exist" })
        }
    } catch (error) {
        resp.status(400).json({ message: error.message })
    }
}

const getCategory = async (req, resp) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;
    try {
        const category = await Category.find({}).skip(skip).limit(limit);
        const totalCategories = await Category.countDocuments(); // Get total number of categories for correct pagination
        if (category.length < 1) {
            resp.status(404).json({ message: "Category not found" });
        } else {
            resp.status(200).json({
                category: category,
                pageNumber: page,
                limitNumber: limit,
                totalCategories: totalCategories // Return total number of categories
            });
        }
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
}

const getActiveCategory = async (req, resp) => {
    try {
        const category = await Category.where("status").equals(true).exec();
        if (category.length < 1) {
            resp.status(404).json({ message: "No active category found" });
        } else {
            resp.status(200).json(category);
        }
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
}

const getFilteredCategory = async (req, resp) => {
    const { data } = req.body;
    try {
        let category = await Category.find({
            "$or": [{
                name: { $regex: data, $options: 'i' } // case-insensitive regex
            }]
        })
        console.log('category', category);
        if (category.length < 1) {
            resp.status(404).json({ message: "No matching category found" });
        } else {
            resp.status(200).json(category);
        }
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
}

const updateCategory = async (req, resp) => {
    const { _id, name, status } = req.body;
    try {
        const category = await Category.findById(_id);
        if (category) {
            category.name = name;
            category.status = status;
            await category.save();
            resp.status(200).json({ message: "Category updated" });
        } else {
            resp.status(400).json({ message: "Id or Category doesnt exist" })
        }
    } catch (error) {
        resp.status(400).json({ message: error.message })
    }
}

const deleteCategory = async (req, resp) => {
    try {
        const category = await Category.findByIdAndDelete({ _id: req.params.categoryID });
        const result = await Product.deleteMany({ categoryID: req.params.categoryID });
        if (category) {
            const messageValue = result.deletedCount ? result.deletedCount : 'category deleted, No Products were linked';
            resp.status(200).json({ message: `${messageValue} products deleted.` });
        } else {
            resp.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
}

module.exports = { createCategory, getCategory, getActiveCategory, getFilteredCategory, updateCategory, deleteCategory }