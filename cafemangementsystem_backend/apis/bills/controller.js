const Bill = require("./model");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const uuid = require("uuid");
const fs = require('fs');
const pagination = require("../../businesslogic/pagination");

const createBill = async (req, resp) => {

    const generateuuid = uuid.v1();
    let orderDetails = req.body;
    orderDetails.uuid = generateuuid;
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
            products: productDetailReport,
            name: orderDetails.name,
            email: orderDetails.email,
            contactNumber: orderDetails.contactNumber,
            paymentMethod: orderDetails.paymentMethod,
            total: orderDetails.total,
            uuid: generateuuid
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

const getpdf = async (req, resp) => {
    try {
        const orderDetails = req.body;
        console.log('orderDetails.uuid', orderDetails.uuid);
        const pdfPath = "./generated_pdf/" + orderDetails.uuid + '.pdf';
        if (fs.existsSync(pdfPath)) {
            resp.contentType("application/pdf");
            return fs.createReadStream(pdfPath).pipe(resp);
        } else {
            let productDetailReport = orderDetails.productDetails;
            const filePath = path.join(__dirname, "report.ejs");
            ejs.renderFile(filePath, {
                products: productDetailReport,
                name: orderDetails.name,
                email: orderDetails.email,
                contactNumber: orderDetails.contactNumber,
                paymentMethod: orderDetails.paymentMethod,
                total: orderDetails.total
            }, (err, result) => {
                if (err) {
                    return resp.status(400).json({ message: err });
                } else {
                    pdf.create(result).toFile("./generated_pdf/" + orderDetails.uuid + ".pdf", (err, data) => {
                        if (err) {
                            return resp.status(400).json({ message: err });
                        } else {
                            resp.contentType("application/pdf");
                            return fs.createReadStream(pdfPath).pipe(resp);
                        }
                    });
                }
            });
        }
    } catch (error) {
        return resp.status(400).json({ message: error.message });
    }
};

const getBills = async (req, resp) => {
    const { page, limit, skip } = pagination(req.query)
    try {
        const bill = await Bill.find({}).skip(skip).limit(limit);
        const billCounter = await Bill.countDocuments();
        if (bill.length < 1) {
            // resp.status(404).json({ message: "No Bill found" });
            resp.status(200).json({ message: "New Costumer with no Bills" });
        } else {
            resp.status(200).json({ bill: bill, page: page, limit: limit, billCounter: billCounter });
        }
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
};

const deleteBill = async (req, resp) => {
    try {
        const bill = await Bill.findByIdAndDelete(req.params);
        if (bill) {
            resp.status(200).json({ message: "Bill deleted" });
        } else {
            resp.status(404).json({ message: "incorrect id" });
        }
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
};

module.exports = { createBill, getpdf, getBills, deleteBill };
