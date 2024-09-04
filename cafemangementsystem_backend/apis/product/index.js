const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/authentification");
const role = require("../../middlewares/checkrole");
const controller = require("./controller");

router.route("/createProduct").post(auth, role, controller.createProduct);
router.route("/getAllProducts").get(auth, controller.getAllProducts);
router.route("/getProductByCategory").post(auth, controller.getProductByCategory);
router.route("/getFilteredProduct").post(auth, controller.getFilteredProduct);
router.route("/getProductByID/:_id").get(auth, controller.getProductByID);
router.route("/updateProduct/:_id").patch(auth, role, controller.updateProduct);
router.route("/updateProductStatus/:_id").patch(auth, role, controller.updateProductStatus);
router.route("/deleteProductByID/:_id").delete(auth, role, controller.deleteProductByID);

module.exports = router;