const express = require("express");
const router = express.Router();
const controller = require("./controller");
const auth = require("../../middlewares/authentification");
const role = require("../../middlewares/checkrole");

router.route("/createCategory").post(auth, role, controller.createCategory);
router.route("/getCategory").get(auth, controller.getCategory);
router.route("/getActiveCategory").get(auth, controller.getActiveCategory);
router.route("/getFilteredCategory").post(auth, controller.getFilteredCategory);
router.route("/updateCategory").patch(auth, role, controller.updateCategory);
router.route("/deleteCategory/:categoryID").delete(auth, role, controller.deleteCategory);

module.exports = router;