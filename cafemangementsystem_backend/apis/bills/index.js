const express = require("express");
const router = express.Router();
const billController = require("./controller");
const auth = require("../../middlewares/authentification");
const role = require("../../middlewares/checkrole");


router.route("/createBill").post(auth, billController.createBill);
router.route("/getpdf").post(auth, billController.getpdf);
router.route("/getBills").get(auth, billController.getBills);
router.route("/deleteBill/:_id").delete(auth, role, billController.deleteBill);

module.exports = router;