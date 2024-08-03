const User = require("./model");

// Sign up the User
// 

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

module.exports = { signUp }