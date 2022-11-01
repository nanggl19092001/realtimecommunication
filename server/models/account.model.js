const { default: mongoose } = require("mongoose");

const accountSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        password: String,
        birthday: Date,
        email: {type: String, index: true, unique: true, sparse: true},
        phoneNumber: {type: String, unique: true}
    }
)

module.exports = mongoose.model("account", accountSchema)