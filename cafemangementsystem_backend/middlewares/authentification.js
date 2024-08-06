require("dotenv").config();
const jwtToken = require("jsonwebtoken");


function authentificationToken(req, resp, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return resp.sendStatus(401);
    } else {
        jwtToken.verify(token, process.env.ACESS_TOKEN, (err, response) => {
            if (err) {
                return resp.sendStatus(403);
            } else {
                resp.locals = response;
                next();
            }
        })
    }
}

module.exports = authentificationToken
