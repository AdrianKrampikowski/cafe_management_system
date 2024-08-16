const express = require("express");
const router = express.Router();
const dashboardController = require("./controller");

router.route("/getDetails").get(dashboardController.getDetails);

module.exports = router;