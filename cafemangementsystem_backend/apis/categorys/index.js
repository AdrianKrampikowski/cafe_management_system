const express = require("express");
const router = express.Router();
const controller = require("./controller");
const auth = require("../../middlewares/authentification")
const role = require("../../middlewares/checkrole");

router.route("/createcategory").post(auth, role, controller.createCategory);
router.route("/getcategory").get(auth, controller.getCategory);
router.route("/updatecategory").patch(auth, role, controller.updateCategory);
router.route("/deleteCategory/:categoryID").delete(auth, role, controller.deleteCategory);

module.exports = router;