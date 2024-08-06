const express = require("express")
const router = express.Router()
const UserController = require("./controller")
var auth = require("../../middlewares/authentification")
var checkrole = require("../../middlewares/checkrole")

router.route("/signup").post(UserController.signUp)
router.route("/login").post(UserController.login)
router.route("/users").get(auth, UserController.getAllUsers)
router.route("/update").patch(UserController.updateUser)


module.exports = router