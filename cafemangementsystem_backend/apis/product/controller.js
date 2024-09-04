const { isForInStatement } = require("typescript");
const Product = require("./model");

const createProduct = async (req, resp) => {
    const { _id, name, status, description } = req.body;
    try {
        let product = new Product(req.body);
        product.categoryID = req.body.category._id;
        let exisitingProduct = Product.where("name").equals(name).exec();
        if (exisitingProduct == product.name) {
            resp.status(400).json({ message: "Product still exist" });
        } else {
            await product.save();

            resp.status(200).json({ message: "Product added" });
        }
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
}

const getAllProducts = async (req, resp) => {
    let { sort } = req.query;
    let queryObject = req.query;
    if (sort) {
        let changeSort = sort.replaceAll(",", " ");
        sort = changeSort;
        delete queryObject.sort;
    }
    try {
        let products = await Product.find(queryObject).sort(sort);
        if (products.length < 1) {
            resp.status(404).json({ message: "No Product found" })
        } else {
            resp.status(200).json(products);
        }
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
};

const getProductByCategory = async (req, resp) => {
    try {
        let product = await Product.find(req.body).where("status").equals(true).exec();
        if (product.length < 1) {
            resp.status(404).json({ message: "No Product with this CategoryID exist" });
        } else {
            resp.status(200).json(product);
        }
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
};

const getFilteredProduct = async (req, resp) => {
    const { data } = req.body;
    let query = [];
    // Handle empty strings or whitespace-only strings
    if (data && data.trim() !== '') {
        // Check if data can be converted to a number
        if (!isNaN(data)) {
            const numericValue = Number(data);
            // For price search, convert the price to a string for regex match
            query.push({
                $expr: {
                    $regexMatch: {
                        input: { $toString: "$price" },  // Convert price to string
                        regex: data,  // Use input data for regex
                        options: 'i'  // Case insensitive
                    }
                }
            });
        } else {
            query.push(
                { name: { $regex: data, $options: 'i' } },  // case-insensitive regex for name
                { description: { $regex: data, $options: 'i' } }  // case-insensitive regex for description
            );
        }
    }

    try {
        // If query array is empty, return all products or handle accordingly
        let product = query.length > 0
            ? await Product.find({ "$or": query })
            : await Product.find({});
        if (product.length < 1) {
            resp.status(404).json({ message: "No matching product found" });
        } else {
            resp.status(200).json(product);
        }
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
}


const getProductByID = async (req, resp) => {
    try {
        let product = await Product.find(req.params);
        console.log('product', product);

        if (product.length < 1) {
            resp.status(404).json({ message: "Product with this ID doesnt exist" });
        } else {
            resp.status(200).json(product);
        }
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
}

const updateProduct = async (req, resp) => {
    const { name, price, description, status } = req.body;
    try {
        let product = await Product.find(req.params);
        product = product[0];
        if (product.length < 1) {
            resp.status(404).json({ message: "Product with this ID doesnt exist" });
        } else {
            product.name = name;
            product.price = price;
            product.description = description;
            product.status = status;
            await product.save();
            resp.status(200).json({ message: "Product " + product.name + " updated" });
        }
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
}

const updateProductStatus = async (req, resp) => {
    const { status } = req.body;
    try {
        let product = await Product.find(req.params);
        product = product[0];
        if (product.length < 1) {
            resp.status(404).json({ message: "Product with this ID doesnt exist" });
        } else {
            product.status = status;
            await product.save();
            resp.status(200).json({ message: "Product " + product.name + " updated" });
        }
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
}

const deleteProductByID = async (req, resp) => {
    try {
        const product = await Product.findByIdAndDelete(req.params);
        if (product) {
            resp.status(200).json({ message: "Product deleted" });
        } else {
            resp.status(404).json({ message: "Product with this ID doesnt exist" });
        }
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
}

module.exports = { createProduct, getAllProducts, getProductByCategory, getFilteredProduct, getProductByID, updateProduct, deleteProductByID, updateProductStatus };