require("dotenv").config()

function checkRole(req, resp, next) {
    if (resp.locals.role == process.env.USER) {
        resp.sendStatus(401)
    } else {
        next()
    }
}

module.exports = checkRole