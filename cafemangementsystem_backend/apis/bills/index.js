const express = require("express");
const router = express.Router();
const billController = require("./controller");

router.route("/createBill").post(billController.createBill);

module.exports = router;