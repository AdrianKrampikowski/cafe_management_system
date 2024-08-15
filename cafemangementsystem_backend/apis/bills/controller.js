const Bill = require("./model");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const uuid = require("uuid");
const fs = require('fs');

const createBill = async (req, resp) => {
    const generateuuid = uuid.v1();
    const orderDetails = req.body;

    // No need to parse productDetails, since it is already an object
    let productDetailReport = orderDetails.productDetails;

    try {
        const bill = new Bill(req.body);
        await bill.save(); // Ensure the save completes before proceeding

        const filePath = path.join(__dirname, "report.ejs");
        console.log("Generated file path:", filePath);

        // Check if file exists before rendering
        if (!fs.existsSync(filePath)) {
            console.error("File not found:", filePath);
            return resp.status(400).json({ message: "File not found at " + filePath });
        }

        console.log("Order Details:", orderDetails);
        console.log("Product Details Report:", productDetailReport);

        ejs.renderFile(filePath, {
            products: [productDetailReport], // If there's only one product, wrap it in an array
            name: orderDetails.name,
            email: orderDetails.email,
            contactNumber: orderDetails.contactNumber,
            paymentMethod: orderDetails.paymentMethod,
            total: orderDetails.total
        }, (err, result) => {
            if (err) {
                console.log('Error in EJS rendering:', err);
                return resp.status(400).json({ message: err });
            } else {
                console.log("Rendered HTML:", result); // Log the HTML

                pdf.create(result).toFile("./generated_pdf/" + generateuuid + ".pdf", (err, data) => {
                    if (err) {
                        return resp.status(400).json({ message: err });
                    } else {
                        return resp.status(200).json({ uuid: generateuuid });
                    }
                });
            }
        });
    } catch (error) {
        return resp.status(400).json({ message: error.message });
    }
};

module.exports = { createBill };
