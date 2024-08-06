const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema([{
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    age: {
        type: Number,
        required: [true, "Age is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    contactNumber: {
        type: String,
        required: [true, "contactNumber is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    status: {
        type: Boolean,
        required: [true, "status is required"]
    },
    role: {
        type: String,
        enum: {
            values: [
                "admin", "user", "superadmin"
            ],
            message: `{VALUE} is not supported`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}])

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel