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
    try {
        const category = await Category.find({});
        if (category.length < 1) {
            resp.status(404).json({ message: "Category not found" });
        } else {
            resp.status(200).json(category);
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

module.exports = { createCategory, getCategory, getActiveCategory, updateCategory, deleteCategory }