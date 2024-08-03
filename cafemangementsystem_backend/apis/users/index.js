const express = require("express")
const router = express.Router()
const UserController = require("./controller")

router.route("/signup").post(UserController.signUp)

module.exports = router