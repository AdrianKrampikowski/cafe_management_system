const User = require("./model");
const jwt = require("jsonwebtoken")
// node in the Terminal
// require("crypto").randomBytes(64).toString('hex')
require("dotenv").config()
const nodemailer = require("nodemailer")

const signUp = async (req, resp) => {
    try {
        const user = await User.where("email").equals(req.body.email).exec();
        if (user.length <= 0) {
            let data = new User(req.body);
            await data.save();
            resp.status(200).json(data);
        } else {
            resp.status(400).json({ message: "User exist" });
        }
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
}

const login = async (req, resp) => {
    try {
        const user = req.body
        const userQuery = await User.where("email").equals(user.email).exec();
        if (userQuery.length <= 0 || userQuery[0].password != user.password) {
            resp.status(401).json({ message: "incorrect Username or Password" })
        } else if (userQuery[0].status == "false") {
            resp.status(401).json({ message: "User is not active" })
        } else if (userQuery[0].password == user.password) {
            const response = { email: userQuery[0].email, role: userQuery[0].role }
            const acessToken = jwt.sign(response, process.env.ACESS_TOKEN, { expiresIn: "10h" })
            resp.status(200).json({ token: acessToken })
        } else {
            resp.status(400).json({ message: "Something went wrong" })
        }
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
}



module.exports = { signUp, login }