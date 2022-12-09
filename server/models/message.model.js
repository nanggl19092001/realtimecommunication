const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        user1: {type: mongoose.Types.ObjectId, required: true},
        user2: {type: mongoose.Types.ObjectId, required: true},
        sentDate: {type: Date, default: Date.now},
        read: {type: Boolean, default: false},
        message: {type: String, required: true},
        messageType: {type: String, required: true}
    }
)

module.exports = mongoose.model("message", messageSchema)