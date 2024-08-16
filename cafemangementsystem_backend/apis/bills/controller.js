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
        await bill.save();
        const filePath = path.join(__dirname, "report.ejs");

        if (!fs.existsSync(filePath)) {
            return resp.status(400).json({ message: "File not found at " + filePath });
        }

        ejs.renderFile(filePath, {
            products: [productDetailReport],
            name: orderDetails.name,
            email: orderDetails.email,
            contactNumber: orderDetails.contactNumber,
            paymentMethod: orderDetails.paymentMethod,
            total: orderDetails.total
        }, (err, result) => {
            if (err) {
                return resp.status(400).json({ message: err });
            } else {
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
