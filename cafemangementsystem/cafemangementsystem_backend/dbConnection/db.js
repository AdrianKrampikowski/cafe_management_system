const mongoose = require("mongoose");
const connectionDB = (uri) => {
    return mongoose.connect(uri)
}

module.exports = connectionDB;