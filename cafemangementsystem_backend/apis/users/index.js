const express = require("express")
const router = express.Router()
const UserController = require("./controller")

router.route("/signup").post(UserController.signUp)
router.route("/login").get(UserController.login)

module.exports = router