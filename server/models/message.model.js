const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        emailUser1: {type: String, required: true},
        emailUser2: {type: String, required: true},
        sentDate: {type: Date, default: Date.now()},
        read: {type: Boolean, default: false},
        message: {type: String, required: true},
        messageType: {type: String, required: true}
    }
,
)

module.exports = mongoose.model("message", messageSchema)