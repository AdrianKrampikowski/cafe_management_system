const Category = require("./model")

const createCategory = async (req, resp) => {
    const { name } = req.body
    try {
        let category = await new Category(req.body);
        const existingCategory = await Category.where("name").equals(name).exec()
        console.log('category', category);
        console.log('existingCategory', existingCategory);

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
    const { select } = req.query;
    let queryObject = req.query;
    if (select) {
        let changeSelect = select.replaceAll(",", " ");
        select = changeSelect;
        delete queryObject.select;
    }
    try {
        const category = await Category.find(queryObject).select(select);
        resp.status(200).json(category)
    } catch (error) {
        resp.status(400).json({ message: error.message })
    }
}

const updateCategory = async (req, resp) => {
    const { _id, name } = req.body;
    try {
        const category = await Category.findById(_id);
        console.log(category);
        
        if (category) {
            category.name = name;
            await category.save();
            resp.status(200).json({ message: "Category updated" });
        } else {
            resp.status(400).json({ message: "Id or Category doesnt exist" })
        }
    } catch (error) {
        resp.status(400).json({ message: error.message })
    }
}

// Add delete
// add necessary Error handlin into getCategory()

module.exports = { createCategory, getCategory, updateCategory }