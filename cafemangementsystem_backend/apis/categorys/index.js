const express = require("express");
const router = express.Router();
const controller = require("./controller");
const auth = require("../../middlewares/authentification")
const role = require("../../middlewares/checkrole");

router.route("/createcategory").post(auth, role, controller.createCategory);
router.route("/getcategory").get(auth, controller.getCategory);

module.exports = router;